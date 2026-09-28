export interface DeviceCapabilities {
  isTouch: boolean;
  isLowPower: boolean;
  prefersReducedMotion: boolean;
  saveData: boolean;
}

export function getDeviceCapabilities(): DeviceCapabilities {
  if (typeof window === 'undefined') {
    return {
      isTouch: false,
      isLowPower: false,
      prefersReducedMotion: false,
      saveData: false,
    };
  }

  const isTouch =
    'ontouchstart' in window ||
    navigator.maxTouchPoints > 0 ||
    window.matchMedia('(pointer: coarse)').matches;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Extended Navigator interface for battery/network/memory
  const nav = navigator as Navigator & {
    deviceMemory?: number;
    connection?: {
      saveData?: boolean;
    };
  };

  const saveData = nav.connection?.saveData === true;

  // Low power indicators: low cores, low ram, or save-data enabled
  const hardwareConcurrency = navigator.hardwareConcurrency || 4;
  const deviceMemory = nav.deviceMemory || 8;
  const isLowPower = hardwareConcurrency <= 4 || deviceMemory <= 4 || saveData;

  return {
    isTouch,
    isLowPower,
    prefersReducedMotion,
    saveData,
  };
}
