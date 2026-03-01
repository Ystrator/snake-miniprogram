// 发烧护理指南数据
const FeverGuide = {
  // 体温等级判断
  getTempLevel(temp) {
    if (temp < 37.3) return { level: 'normal', text: '正常', color: '#52C41A' };
    if (temp < 38.0) return { level: 'low', text: '低热', color: '#FAAD14' };
    if (temp < 39.0) return { level: 'medium', text: '中热', color: '#FF7A45' };
    if (temp < 41.0) return { level: 'high', text: '高热', color: '#FF4D4F' };
    return { level: 'emergency', text: '超高热', color: '#CF1322' };
  },

  // 护理建议
  getCareAdvice(temp) {
    const level = this.getTempLevel(temp).level;
    
    const advice = {
      normal: {
        title: '体温正常',
        tips: [
          '保持良好的生活习惯',
          '注意室内通风',
          '定期测量体温'
        ]
      },
      low: {
        title: '低热护理建议',
        tips: [
          '多喝温开水，促进新陈代谢',
          '减少衣物，保持室内通风',
          '温水擦浴（额头、颈部、腋下）',
          '密切观察体温变化'
        ],
        medication: '一般不需要用药，如精神状态良好可物理降温'
      },
      medium: {
        title: '中热护理建议',
        tips: [
          '多喝水或电解质水',
          '保持室内温度适宜（22-26℃）',
          '温水擦浴或冰袋降温',
          '记录体温变化，每2-3小时测量一次'
        ],
        medication: '可按说明书使用布洛芬/对乙酰氨基酚（体温>38.5℃）'
      },
      high: {
        title: '高热护理建议',
        tips: [
          '立即就医或咨询医生',
          '保持水分摄入',
          '减少衣物但避免着凉',
          '物理降温：温水擦浴、冰袋（额头）'
        ],
        medication: '在医生指导下使用退烧药',
        warning: '如出现惊厥、呼吸困难等严重症状立即送医'
      },
      emergency: {
        title: '超高热紧急处理',
        tips: [
          '⚠️ 立即送医！',
          '保持呼吸道通畅',
          '物理降温同时尽快就医'
        ],
        warning: '超高热可能导致严重并发症，必须立即就医'
      }
    };
    
    return advice[level] || advice.normal;
  },

  // 紧急情况判断
  isEmergency(temp, age, symptoms) {
    const criteria = [];
    
    if (temp >= 39.0) criteria.push('体温超过39℃');
    if (temp >= 38.5 && age < 6) criteria.push('6个月以下高热');
    
    if (symptoms) {
      if (symptoms.includes('convulsion')) criteria.push('抽搐');
      if (symptoms.includes('breath_difficulty')) criteria.push('呼吸困难');
      if (symptoms.includes('lethargy')) criteria.push('精神萎靡');
      if (symptoms.includes('dehydration')) criteria.push('脱水症状');
    }
    
    return criteria.length > 0 ? { needHospital: true, reasons: criteria } : { needHospital: false };
  }
};

module.exports = FeverGuide;
