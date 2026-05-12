import React, { useState, useEffect } from 'react';

const UserAvatarPanel = ({ selectedProfile, onSelectProfile, onEditProfile, isEditMode = false }) => {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingProfile, setEditingProfile] = useState(null);
  const [showPhotoSelector, setShowPhotoSelector] = useState(false);
  const availablePhotos = [
    '03_Natalia_42_salad.png', '10_Alex_48_soup.png', '16_Anastasia_37_street.png',
    '01_Maia_55_flowers.png', '02_Stepan_14_on_bench.png', '04_Nina_75_Oleg_27_notebook.png',
    '05_Дмитрий_55_notepad.png', '06_Maria_43_kitchen_apron.png', '07_Ivan_13_chips.png',
    '08_Galina_75_Vika_9_balcony.png', '09_Tanya_15_pasta.png', '11_Nilolay_23_chocolate_bar.png',
    '12_Galina_43_remote_work.png', '14_Ekaterina_39_wearable.png', '15_Polina_21_coffie.png',
    '17_Stepan_72_terier.png', '17_Stepan_72_terier_2.png', '19_Danil_29_sofa_blue_jeanse.png', '19_Stas_35_dog_bike.png',
    '20_Irina_31_box_openspace.png', '21_Yulia_35_coffie_white_blouse.png', '22_Varya_30_yoga.png',
    '23_Alina_26_baby_carriage_park.png', '23_Ken_38_vegitables.png', '24_Alla_38_mirror.png',
    '24_fam_white_kitchen.png', '24_Masha_Andrey_caffe.png', '25_Katya_29_office.png',
    '26_Alex_Regina_desert.png', '29_cinema_family.png',
  ];

  useEffect(() => {
    fetch('/api/profiles')
      .then(res => { if (!res.ok) throw new Error('HTTP ' + res.status); return res.json(); })
      .then(data => {
        const apiProfiles = data.profiles || [];
        const fallback = generateFallbackProfiles();
        const merged = [];
        const used = new Set();
        fallback.forEach(fb => {
          const match = apiProfiles.find(ap => ap.profile_id === fb.profile_id);
          if (match) {
            merged.push({ ...fb, ...match });
            used.add(match.profile_id);
          } else {
            merged.push(fb);
          }
        });
        apiProfiles.forEach(ap => {
          if (!used.has(ap.profile_id)) merged.push(ap);
        });
        setProfiles(merged);
        setLoading(false);
      })
      .catch(() => {
        setProfiles(generateFallbackProfiles());
        setLoading(false);
      });
  }, []);

  const getStatusColor = (risk) => {
    if (risk === 'low') return '#00c853';
    if (risk === 'high') return '#d50000';
    return '#ff9100';
  };

  const getBMIStatus = (bmi) => {
    if (bmi < 18.5) return 'warning';
    if (bmi > 25) return 'warning';
    return 'good';
  };

  const FemaleIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="24" height="24">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
      <circle cx="12" cy="7" r="4"/>
    </svg>
  );

  const MaleIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="24" height="24">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
      <circle cx="12" cy="7" r="4"/>
      <line x1="17" y1="11" x2="23" y2="11"/>
      <line x1="20" y1="8" x2="20" y2="14"/>
    </svg>
  );

  const StarIcon = () => (
    <svg viewBox="0 0 24 24" width="12" height="12" fill="#ffc107" stroke="none">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
    </svg>
  );

  return (
    <div className="user-avatar-panel">
      <div className="panel-header">
        <h3>Digital Twins</h3>
        <span className="count">{profiles.length} profiles</span>
      </div>

      <div className="profiles-list">
        {loading ? (
          <div className="loading">Loading profiles...</div>
        ) : (
          profiles.map((profile, index) => (
            <div
              key={profile.profile_id || index}
              className={`profile-card ${selectedProfile === profile.profile_id ? 'selected' : ''}`}
              onClick={() => onSelectProfile(profile.profile_id)}
            >
              <div className="avatar">
                {profile.photo ? (
                  <div className="avatar-circle" style={{
                    background: `linear-gradient(135deg, ${getStatusColor(profile.digital_twin_scores?.risk_level)}20, ${getStatusColor(profile.digital_twin_scores?.risk_level)}40)`,
                    overflow: 'hidden'
                  }}>
                    <img
                      src={`/images/pers/${profile.photo}`}
                      alt={profile.profile_id}
                      className="profile-photo"
                      onError={(e) => { e.target.style.display = 'none'; e.target.parentElement.innerHTML += '<span class="avatar-icon"></span>'; }}
                    />
                  </div>
                ) : (
                  <div className="avatar-circle" style={{
                    background: `linear-gradient(135deg, ${getStatusColor(profile.digital_twin_scores?.risk_level)}20, ${getStatusColor(profile.digital_twin_scores?.risk_level)}40)`
                  }}>
                    <span className="avatar-icon">
                      {profile.demographics?.sex === 'female' ? <FemaleIcon /> : <MaleIcon />}
                    </span>
                  </div>
                )}
                <div className="status-dot" style={{
                  background: getStatusColor(profile.digital_twin_scores?.risk_level)
                }}></div>
              </div>

              <div className="profile-info">
                <div className="profile-name">
                  {profile.name || (profile.demographics?.sex === 'female' ? 'Female' : 'Male')} {profile.demographics?.age}y
                  {isEditMode && (
                    <button className="edit-btn" onClick={(e) => { e.stopPropagation(); setEditingProfile(profile); setShowPhotoSelector(true); }}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="10" height="10">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                      </svg>
                    </button>
                  )}
                </div>
                <div className="profile-id">{profile.profile_id}</div>
                <div className="profile-params">
                  <span className={`param ${getBMIStatus(profile.anthropometrics?.bmi)}`}>
                    BMI {profile.anthropometrics?.bmi}
                  </span>
                  <span className="param">
                    {profile.vitals?.systolic_bp_mmhg}/{profile.vitals?.diastolic_bp_mmhg}
                  </span>
                </div>
                <div className="profile-scores">
                  <span className="stars">
                    <StarIcon /> {profile.digital_twin_scores?.current_stars || 0}
                  </span>
                  <span className="risk-badge" style={{
                    background: getStatusColor(profile.digital_twin_scores?.risk_level) + '20',
                    color: getStatusColor(profile.digital_twin_scores?.risk_level)
                  }}>
                    {profile.digital_twin_scores?.risk_level || 'unknown'}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Photo Selector Modal */}
      {showPhotoSelector && (
        <div className="photo-selector-overlay" onClick={() => setShowPhotoSelector(false)}>
          <div className="photo-selector" onClick={(e) => e.stopPropagation()}>
            <div className="photo-selector-header">
              <h4>Выберите фото</h4>
              <button className="close-btn" onClick={() => setShowPhotoSelector(false)}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                  <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>
            <div className="photo-grid">
              {availablePhotos.map((photo) => (
                <div
                  key={photo}
                  className={`photo-item ${editingProfile?.photo === photo ? 'selected' : ''}`}
                  onClick={() => {
                    if (onEditProfile && editingProfile) {
                      onEditProfile(editingProfile.profile_id, { photo });
                      setProfiles(prev => prev.map(p => p.profile_id === editingProfile.profile_id ? { ...p, photo } : p));
                    }
                    setShowPhotoSelector(false);
                    setEditingProfile(null);
                  }}
                >
                  <img src={`/images/pers/${photo}`} alt={photo} />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <style>{`
        .user-avatar-panel {
          width: 280px;
          background: white;
          border-right: 1px solid #e0e0e0;
          display: flex;
          flex-direction: column;
          height: 100%;
          overflow: hidden;
        }

        .panel-header {
          padding: 15px;
          border-bottom: 1px solid #f0f0f0;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .panel-header h3 {
          margin: 0;
          font-size: 16px;
          color: #311b92;
        }

        .panel-header .count {
          font-size: 11px;
          color: #757575;
          background: #f5f5f5;
          padding: 2px 8px;
          border-radius: 10px;
        }

        .profiles-list {
          flex: 1;
          overflow-y: auto;
          padding: 10px;
        }

        .profile-card {
          display: flex;
          gap: 8px;
          padding: 6px;
          margin-bottom: 4px;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s;
          border: 2px solid transparent;
          background: #fafafa;
        }

        .profile-card:hover {
          background: #f3e5f5;
          transform: translateX(2px);
        }

        .profile-card.selected {
          background: #ede7f6;
          border-color: #6b21c8;
          box-shadow: 0 2px 8px rgba(107, 33, 200, 0.2);
        }

        .avatar {
          position: relative;
          flex-shrink: 0;
        }

        .avatar-circle {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .profile-photo {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          object-fit: cover;
        }

        .avatar-icon svg {
          width: 16px;
          height: 16px;
          color: #311b92;
        }

        .status-dot {
          position: absolute;
          bottom: 0;
          right: 0;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          border: 1px solid white;
        }

        .profile-info {
          flex: 1;
          min-width: 0;
        }

        .profile-name {
          font-size: 11px;
          font-weight: 600;
          color: #311b92;
          margin-bottom: 1px;
        }

        .profile-id {
          font-size: 8px;
          color: #757575;
          margin-bottom: 2px;
        }

        .profile-params {
          display: flex;
          gap: 4px;
          margin-bottom: 2px;
        }

        .param {
          font-size: 9px;
          color: #424242;
          padding: 1px 4px;
          background: white;
          border-radius: 3px;
        }

        .param.good { color: #00c853; }
        .param.warning { color: #ff9100; }

        .profile-scores {
          display: flex;
          gap: 4px;
          align-items: center;
        }

        .stars {
          font-size: 9px;
          color: #ffc107;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 2px;
        }

.risk-badge {
          font-size: 8px;
          padding: 1px 4px;
          border-radius: 3px;
          font-weight: 500;
        }

        .edit-btn {
          margin-left: 4px;
          background: none;
          border: none;
          cursor: pointer;
          color: #6b21c8;
          padding: 2px;
          border-radius: 3px;
          display: inline-flex;
          align-items: center;
          transition: all 0.2s;
        }

        .edit-btn:hover {
          background: rgba(107, 33, 200, 0.1);
        }

        .photo-selector-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }

        .photo-selector {
          background: white;
          border-radius: 12px;
          width: 500px;
          max-height: 80vh;
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }

        .photo-selector-header {
          padding: 12px 16px;
          background: #f5f5f5;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid #e0e0e0;
        }

        .photo-selector-header h4 {
          margin: 0;
          font-size: 14px;
          color: #311b92;
        }

        .close-btn {
          background: none;
          border: none;
          cursor: pointer;
          color: #757575;
          padding: 4px;
          border-radius: 4px;
        }

        .close-btn:hover {
          background: #e0e0e0;
        }

        .photo-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 8px;
          padding: 16px;
          overflow-y: auto;
        }

        .photo-item {
          aspect-ratio: 1;
          border-radius: 8px;
          overflow: hidden;
          cursor: pointer;
          border: 2px solid transparent;
          transition: all 0.2s;
        }

        .photo-item:hover {
          border-color: #6b21c8;
          transform: scale(1.05);
        }

        .photo-item.selected {
          border-color: #6b21c8;
          box-shadow: 0 0 8px rgba(107, 33, 200, 0.5);
        }

        .photo-item img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      `}</style>
    </div>
  );
};

const generateFallbackProfiles = () => {
  return [
    { profile_id: 'TEST_001', name: 'Анна', photo: '03_Natalia_42_salad.png', demographics: { sex: 'female', age: 28 }, anthropometrics: { bmi: 20.2, weight_kg: 58 }, vitals: { systolic_bp_mmhg: 105, diastolic_bp_mmhg: 68 }, digital_twin_scores: { current_stars: 840, risk_level: 'low' } },
    { profile_id: 'TEST_002', name: 'Михаил', photo: '10_Alex_48_soup.png', demographics: { sex: 'male', age: 42 }, anthropometrics: { bmi: 31.2, weight_kg: 96 }, vitals: { systolic_bp_mmhg: 142, diastolic_bp_mmhg: 91 }, digital_twin_scores: { current_stars: 210, risk_level: 'high' } },
    { profile_id: 'TEST_003', name: 'Елена', photo: '16_Anastasia_37_street.png', demographics: { sex: 'female', age: 34 }, anthropometrics: { bmi: 22.1, weight_kg: 64 }, vitals: { systolic_bp_mmhg: 118, diastolic_bp_mmhg: 76 }, digital_twin_scores: { current_stars: 650, risk_level: 'medium' } },
    { profile_id: 'P005', name: 'Дмитрий', photo: '05_Дмитрий_55_notepad.png', demographics: { sex: 'male', age: 55 }, anthropometrics: { bmi: 27.8, weight_kg: 88 }, vitals: { systolic_bp_mmhg: 135, diastolic_bp_mmhg: 88 }, digital_twin_scores: { current_stars: 450, risk_level: 'medium' } },
    { profile_id: 'P007', name: 'Иван', photo: '07_Ivan_13_chips.png', demographics: { sex: 'male', age: 13 }, anthropometrics: { bmi: 19.2, weight_kg: 48 }, vitals: { systolic_bp_mmhg: 108, diastolic_bp_mmhg: 68 }, digital_twin_scores: { current_stars: 950, risk_level: 'low' } },
    { profile_id: 'P014', name: 'Екатерина', photo: '14_Ekaterina_39_wearable.png', demographics: { sex: 'female', age: 39 }, anthropometrics: { bmi: 20.8, weight_kg: 60 }, vitals: { systolic_bp_mmhg: 115, diastolic_bp_mmhg: 74 }, digital_twin_scores: { current_stars: 780, risk_level: 'low' } },
    { profile_id: 'P019b', name: 'Стас', photo: '19_Stas_35_dog_bike.png', demographics: { sex: 'male', age: 35 }, anthropometrics: { bmi: 24.8, weight_kg: 82 }, vitals: { systolic_bp_mmhg: 125, diastolic_bp_mmhg: 80 }, digital_twin_scores: { current_stars: 680, risk_level: 'low' } },
    { profile_id: 'P022', name: 'Варя', photo: '22_Varya_30_yoga.png', demographics: { sex: 'female', age: 30 }, anthropometrics: { bmi: 20.2, weight_kg: 57 }, vitals: { systolic_bp_mmhg: 110, diastolic_bp_mmhg: 70 }, digital_twin_scores: { current_stars: 900, risk_level: 'low' } },
    { profile_id: 'P025', name: 'Катя', photo: '25_Katya_29_office.png', demographics: { sex: 'female', age: 29 }, anthropometrics: { bmi: 20.7, weight_kg: 59 }, vitals: { systolic_bp_mmhg: 110, diastolic_bp_mmhg: 70 }, digital_twin_scores: { current_stars: 640, risk_level: 'low' } },
    { profile_id: 'P008', name: 'Галина', photo: '08_Galina_75_Vika_9_balcony.png', demographics: { sex: 'female', age: 75 }, anthropometrics: { bmi: 26.6, weight_kg: 68 }, vitals: { systolic_bp_mmhg: 148, diastolic_bp_mmhg: 88 }, digital_twin_scores: { current_stars: 320, risk_level: 'high' } },
  ];
};

export default UserAvatarPanel;
