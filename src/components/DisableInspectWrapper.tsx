// components/DisableInspectWrapper.tsx
'use client';

import { useEffect } from 'react';
import DisableInspect from '../utils/DisableInspect';

const DisableInspectWrapper = () => {
  useEffect(() => {
    DisableInspect();
  }, []);

  return null;
};

export default DisableInspectWrapper;
