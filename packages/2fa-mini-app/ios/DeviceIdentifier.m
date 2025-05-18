#import "DeviceIdentifier.h"
#import <UIKit/UIKit.h>

@implementation DeviceIdentifier

// Expose this module under the name “DeviceIdentifier”
RCT_EXPORT_MODULE();

// Expose an async method that returns the IDFV via Promise
RCT_REMAP_METHOD(getDeviceIdentifier,
                 getDeviceIdentifierWithResolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject)
{
  @try {
    NSString *idfv = [[[UIDevice currentDevice] identifierForVendor] UUIDString];
    resolve(idfv);
  }
  @catch (NSException *exception) {
    reject(@"E_DEVICE_ID", @"Could not fetch device identifier", nil);
  }
}

@end
