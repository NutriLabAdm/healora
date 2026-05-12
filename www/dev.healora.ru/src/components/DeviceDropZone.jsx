import React, { useState, useCallback } from 'react';

// DeviceDropZone: accepts dropped data (JSON or text) and passes parsed object to onDrop
const DeviceDropZone = ({ onDrop, allowedTypes = ['wearable','bio_check','bio_anamnes'] }) => {
  const [over, setOver] = useState(false);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setOver(false);
    const data = e.dataTransfer.getData('application/json') || e.dataTransfer.getData('text/plain');
    if (!data) return;
    let payload = data;
    try { payload = JSON.parse(data); } catch {}
    // If payload has type, try to validate
    const type = payload?.type || (payload?.device_type?.toLowerCase?.() ?? 'unknown');
    if (allowedTypes.includes(type)) {
      onDrop?.(payload);
    } else {
      // If it's not matching, pass raw payload
      onDrop?.(payload);
    }
  }, [onDrop, allowedTypes]);

  return (
    <div
      className={`drop-zone ${over ? 'active' : ''}`}
      onDragOver={(e) => { e.preventDefault(); setOver(true); }}
      onDragLeave={() => setOver(false)}
      onDrop={handleDrop}
      style={{ padding: 20, borderRadius: 12 }}
    >
      Перетащите данные устройства сюда
    </div>
  );
};

export default DeviceDropZone;
