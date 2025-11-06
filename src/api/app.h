// ⚡ Zippy - Application API
// High-level API for application lifecycle

#ifndef ZIPPY_API_APP_H
#define ZIPPY_API_APP_H

#ifdef __cplusplus
extern "C" {
#endif

/**
 * Initialize Zippy application APIs
 * This should be called before using any app functions
 */
int zippy_api_init(void);

/**
 * Cleanup Zippy application APIs
 */
void zippy_api_cleanup(void);

#ifdef __cplusplus
}
#endif

#endif // ZIPPY_API_APP_H

