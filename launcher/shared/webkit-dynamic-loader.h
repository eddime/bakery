/**
 * 🥐 Bakery - Dynamic WebKitGTK Loader (like Neutralino)
 * Loads WebKitGTK at runtime via dlopen() instead of compile-time linking
 * This allows cross-compilation and universal Linux binaries
 */

#ifndef WEBKIT_DYNAMIC_LOADER_H
#define WEBKIT_DYNAMIC_LOADER_H

#include <dlfcn.h>
#include <iostream>
#include <string>

namespace bakery {
namespace webkit {

// Forward declarations for WebKit types
typedef void* GtkWidget;
typedef void* WebKitWebView;
typedef void* WebKitSettings;
typedef void* WebKitUserContentManager;
typedef int gboolean;
typedef void (*GCallback)();
typedef void* gpointer;

// Function pointers for GTK/WebKit functions
struct WebKitAPI {
    // GTK functions
    void (*gtk_init)(int* argc, char*** argv);
    GtkWidget* (*gtk_window_new)(int type);
    void (*gtk_window_set_title)(GtkWidget* window, const char* title);
    void (*gtk_window_set_default_size)(GtkWidget* window, int width, int height);
    void (*gtk_container_add)(GtkWidget* container, GtkWidget* widget);
    void (*gtk_widget_show_all)(GtkWidget* widget);
    void (*gtk_main)();
    void (*gtk_main_quit)();
    gboolean (*g_signal_connect_data)(gpointer instance, const char* signal, GCallback callback, 
                                       gpointer data, void* destroy_data, int connect_flags);
    void (*gtk_window_set_icon_from_file)(GtkWidget* window, const char* filename, void** error);
    
    // WebKit functions
    WebKitWebView* (*webkit_web_view_new)();
    void (*webkit_web_view_load_uri)(WebKitWebView* web_view, const char* uri);
    WebKitSettings* (*webkit_web_view_get_settings)(WebKitWebView* web_view);
    void (*webkit_settings_set_enable_developer_extras)(WebKitSettings* settings, gboolean enabled);
    void (*webkit_settings_set_enable_write_console_messages_to_stdout)(WebKitSettings* settings, gboolean enabled);
    void (*webkit_settings_set_javascript_can_access_clipboard)(WebKitSettings* settings, gboolean enabled);
    void (*webkit_settings_set_enable_webgl)(WebKitSettings* settings, gboolean enabled);
    void (*webkit_settings_set_hardware_acceleration_policy)(WebKitSettings* settings, int policy);
    WebKitUserContentManager* (*webkit_web_view_get_user_content_manager)(WebKitWebView* web_view);
    void (*webkit_user_content_manager_add_script)(WebKitUserContentManager* manager, void* script);
    void* (*webkit_user_script_new)(const char* source, int injected_frames, int injection_time,
                                     const char* const* allow_list, const char* const* block_list);
};

class DynamicWebKitLoader {
private:
    void* gtk_handle = nullptr;
    void* webkit_handle = nullptr;
    WebKitAPI api;
    bool loaded = false;
    std::string error_message;

public:
    DynamicWebKitLoader() {}
    
    ~DynamicWebKitLoader() {
        if (webkit_handle) dlclose(webkit_handle);
        if (gtk_handle) dlclose(gtk_handle);
    }
    
    bool load() {
        // Try to load GTK3
        gtk_handle = dlopen("libgtk-3.so.0", RTLD_LAZY | RTLD_GLOBAL);
        if (!gtk_handle) {
            gtk_handle = dlopen("libgtk-3.so", RTLD_LAZY | RTLD_GLOBAL);
        }
        
        if (!gtk_handle) {
            error_message = "Failed to load libgtk-3.so: " + std::string(dlerror());
            return false;
        }
        
        // Try to load WebKit2GTK 4.1 first, then 4.0
        webkit_handle = dlopen("libwebkit2gtk-4.1.so.0", RTLD_LAZY | RTLD_GLOBAL);
        if (!webkit_handle) {
            webkit_handle = dlopen("libwebkit2gtk-4.0.so.37", RTLD_LAZY | RTLD_GLOBAL);
        }
        if (!webkit_handle) {
            webkit_handle = dlopen("libwebkit2gtk-4.0.so", RTLD_LAZY | RTLD_GLOBAL);
        }
        
        if (!webkit_handle) {
            error_message = "Failed to load libwebkit2gtk: " + std::string(dlerror());
            dlclose(gtk_handle);
            gtk_handle = nullptr;
            return false;
        }
        
        // Load GTK functions
        #define LOAD_GTK_FUNC(name) \
            api.name = reinterpret_cast<decltype(api.name)>(dlsym(gtk_handle, #name)); \
            if (!api.name) { \
                error_message = "Failed to load " #name; \
                return false; \
            }
        
        LOAD_GTK_FUNC(gtk_init);
        LOAD_GTK_FUNC(gtk_window_new);
        LOAD_GTK_FUNC(gtk_window_set_title);
        LOAD_GTK_FUNC(gtk_window_set_default_size);
        LOAD_GTK_FUNC(gtk_container_add);
        LOAD_GTK_FUNC(gtk_widget_show_all);
        LOAD_GTK_FUNC(gtk_main);
        LOAD_GTK_FUNC(gtk_main_quit);
        LOAD_GTK_FUNC(g_signal_connect_data);
        LOAD_GTK_FUNC(gtk_window_set_icon_from_file);
        
        // Load WebKit functions
        #define LOAD_WEBKIT_FUNC(name) \
            api.name = reinterpret_cast<decltype(api.name)>(dlsym(webkit_handle, #name)); \
            if (!api.name) { \
                error_message = "Failed to load " #name; \
                return false; \
            }
        
        LOAD_WEBKIT_FUNC(webkit_web_view_new);
        LOAD_WEBKIT_FUNC(webkit_web_view_load_uri);
        LOAD_WEBKIT_FUNC(webkit_web_view_get_settings);
        LOAD_WEBKIT_FUNC(webkit_settings_set_enable_developer_extras);
        LOAD_WEBKIT_FUNC(webkit_settings_set_enable_write_console_messages_to_stdout);
        LOAD_WEBKIT_FUNC(webkit_settings_set_javascript_can_access_clipboard);
        LOAD_WEBKIT_FUNC(webkit_settings_set_enable_webgl);
        LOAD_WEBKIT_FUNC(webkit_settings_set_hardware_acceleration_policy);
        LOAD_WEBKIT_FUNC(webkit_web_view_get_user_content_manager);
        LOAD_WEBKIT_FUNC(webkit_user_content_manager_add_script);
        LOAD_WEBKIT_FUNC(webkit_user_script_new);
        
        #undef LOAD_GTK_FUNC
        #undef LOAD_WEBKIT_FUNC
        
        loaded = true;
        return true;
    }
    
    bool isLoaded() const { return loaded; }
    const std::string& getError() const { return error_message; }
    const WebKitAPI& getAPI() const { return api; }
};

} // namespace webkit
} // namespace bakery

#endif // WEBKIT_DYNAMIC_LOADER_H

