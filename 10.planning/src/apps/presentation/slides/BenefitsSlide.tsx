import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Badge } from '../../../components/ui/badge';
import { CheckCircle2, TrendingUp, Zap, Shield, Users, DollarSign, Clock, Target, Sparkles, BarChart3 } from 'lucide-react';
import { motion } from 'motion/react';

export function BenefitsSlide() {
  const keyBenefits = [
    {
      icon: Zap,
      title: '자동화된 운영',
      description: '수동 개입 없는 완전 자동화 운영',
      metrics: [
        { label: '자동 해결률', value: 85, unit: '%', improvement: '+65%' },
        { label: '운영 효율성', value: 92, unit: '%', improvement: '+42%' }
      ],
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-500/20',
      borderColor: 'border-emerald-500/40'
    },
    {
      icon: BarChart3,
      title: '지능형 분석',
      description: 'AI 기반 예측 분석 및 패턴 인식',
      metrics: [
        { label: '알람 정확도', value: 98, unit: '%', improvement: '+68%' },
        { label: '예측 정확도', value: 94, unit: '%', improvement: '+74%' }
      ],
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/20',
      borderColor: 'border-purple-500/40'
    },
    {
      icon: Clock,
      title: '빠른 대응 시간',
      description: '문제 감지부터 해결까지 최소 시간',
      metrics: [
        { label: '평균 복구 시간', value: 75, unit: '% 단축', improvement: '4시간→15분' },
        { label: '알람 응답', value: 90, unit: '% 개선', improvement: '<30초' }
      ],
      color: 'text-cyan-400',
      bgColor: 'bg-cyan-500/20',
      borderColor: 'border-cyan-500/40'
    },
    {
      icon: DollarSign,
      title: '비용 최적화',
      description: '운영비 절감 및 ROI 극대화',
      metrics: [
        { label: '운영비 절감', value: 40, unit: '%', improvement: '연간 2억원 절약' },
        { label: '현장 출동', value: 70, unit: '% 감소', improvement: '월 120→36건' }
      ],
      color: 'text-orange-400',
      bgColor: 'bg-orange-500/20',
      borderColor: 'border-orange-500/40'
    }
  ];

  const businessImpact = [
    {
      category: '운영 효율성',
      improvements: [
        { metric: '알람 오탐률', before: '30%', after: '2%', improvement: '93% 감소' },
        { metric: '자동화 수준', before: '20%', after: '85%', improvement: '325% 증가' },
        { metric: '데이터 활용도', before: '30%', after: '95%', improvement: '217% 증가' }
      ],
      icon: TrendingUp,
      color: 'text-emerald-400'
    },
    {
      category: '고객 만족도',
      improvements: [
        { metric: '서비스 가용성', before: '95%', after: '99.5%', improvement: '4.5%p 증가' },
        { metric: '평균 복구 시간', before: '4시간', after: '15분', improvement: '94% 단축' },
        { metric: '고객 응답 시간', before: '2시간', after: '5분', improvement: '96% 단축' }
      ],
      icon: Users,
      color: 'text-cyan-400'
    }
  ];

  const competitiveAdvantages = [
    {
      title: '통합 플랫폼',
      description: '7개 분산 시스템을 단일 플랫폼으로 통합',
      advantage: '관리 복잡성 80% 감소',
      icon: Target
    },
    {
      title: '예측적 유지보수',
      description: 'AI 기반 장애 예측 및 사전 대응',
      advantage: '예방 가능한 장애 90% 사전 차단',
      icon: Sparkles
    },
    {
      title: '완전 자동화',
      description: '감지부터 해결까지 무인 자동화',
      advantage: '24/7 무인 운영 가능',
      icon: Shield
    }
  ];

  const roi = [
    { period: '3개월', value: '40%', description: '초기 개선 효과 확인' },
    { period: '6개월', value: '180%', description: '운영 최적화 달성' },
    { period: '12개월', value: '320%', description: '완전한 ROI 실현' }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-4 sm:space-y-6 md:space-y-8 h-full flex flex-col"
    >
      {/* Header */}
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-center mb-4 sm:mb-6 md:mb-8"
      >
        <h2 className="text-2xl sm:text-3xl md:text-4xl mb-3 sm:mb-4 bg-gradient-to-r from-emerald-400 via-green-400 to-cyan-400 bg-clip-text text-transparent px-2 font-bold break-words">
          4. 모니터링 · 분석 · 제어
        </h2>
        <p className="text-base sm:text-lg md:text-xl text-slate-100 max-w-3xl mx-auto px-4 leading-relaxed font-medium break-words">
          실시간 모니터링, AI 분석, 자동 제어가 만드는 운영 혁신
        </p>
      </motion.div>

      <div className="flex-1 space-y-4 sm:space-y-6 md:space-y-8">
        {/* Key Benefits Grid */}
        <div>
          <h3 className="text-lg sm:text-xl md:text-2xl text-white mb-3 sm:mb-4 md:mb-6 flex items-center gap-2 sm:gap-3 px-2 font-semibold">
            <CheckCircle2 className="h-5 w-5 sm:h-6 sm:w-6 text-emerald-400 flex-shrink-0" />
            <span className="break-words">핵심 이점</span>
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
            {keyBenefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <Card className={`bg-white/5 border-2 ${benefit.borderColor} hover:bg-white/10 transition-all duration-300 h-full`}>
                  <CardContent className="p-2 sm:p-4 md:p-6">
                    <div className="flex items-start gap-2 sm:gap-3 md:gap-4 mb-2 sm:mb-3 md:mb-4">
                      <div className={`p-1.5 sm:p-2 md:p-3 rounded-lg ${benefit.bgColor} flex-shrink-0 mt-0.5`}>
                        <benefit.icon className={`h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 ${benefit.color}`} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="text-base sm:text-lg text-white mb-1 font-semibold break-words">
                          {benefit.title}
                        </h4>
                        <p className="text-slate-200 text-xs sm:text-sm font-medium break-words">
                          {benefit.description}
                        </p>
                      </div>
                    </div>
                    
                    <div className="space-y-3 sm:space-y-4">
                      {benefit.metrics.map((metric, metricIndex) => (
                        <div key={metricIndex} className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-slate-100 text-xs sm:text-sm font-medium flex-1 min-w-0 pr-2 break-words">
                              {metric.label}
                            </span>
                            <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
                              <span className="text-white text-sm sm:text-base font-semibold whitespace-nowrap">
                                {metric.value}{metric.unit}
                              </span>
                              <Badge variant="secondary" className="bg-emerald-500/40 text-emerald-100 border-emerald-400/50 text-xs px-2 py-0.5 font-medium whitespace-nowrap">
                                {metric.improvement}
                              </Badge>
                            </div>
                          </div>
                          <div className="w-full bg-white/20 rounded-full h-2 sm:h-3">
                            <div 
                              className={`h-2 sm:h-3 rounded-full transition-all duration-700 ${
                                index === 0 ? 'bg-gradient-to-r from-emerald-400 to-green-400' :
                                index === 1 ? 'bg-gradient-to-r from-purple-400 to-violet-400' :
                                index === 2 ? 'bg-gradient-to-r from-cyan-400 to-blue-400' :
                                'bg-gradient-to-r from-orange-400 to-yellow-400'
                              }`}
                              style={{ width: `${metric.value}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Business Impact */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
          <div>
            <h3 className="text-lg sm:text-xl md:text-2xl text-white mb-3 sm:mb-4 md:mb-6 flex items-center gap-2 sm:gap-3 px-2 font-semibold">
              <TrendingUp className="h-5 w-5 sm:h-6 sm:w-6 text-purple-400 flex-shrink-0" />
              <span className="break-words">비즈니스 임팩트</span>
            </h3>
            
            <div className="space-y-3 sm:space-y-4 md:space-y-6">
              {businessImpact.map((impact, index) => (
                <motion.div
                  key={index}
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.8 + index * 0.2 }}
                  className="bg-white/10 border border-white/30 rounded-lg p-2 sm:p-4 md:p-6"
                >
                  <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                    <impact.icon className={`h-5 w-5 sm:h-6 sm:w-6 ${impact.color} flex-shrink-0`} />
                    <h4 className="text-base sm:text-lg text-white font-semibold break-words">
                      {impact.category}
                    </h4>
                  </div>
                  
                  <div className="space-y-2 sm:space-y-3">
                    {impact.improvements.map((improvement, impIndex) => (
                      <div key={impIndex} className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 p-2 sm:p-3 bg-white/10 rounded-lg">
                        <div className="flex-1 min-w-0">
                          <div className="text-white text-xs sm:text-sm font-medium break-words">
                            {improvement.metric}
                          </div>
                          <div className="text-slate-200 text-xs break-words">
                            {improvement.before} → {improvement.after}
                          </div>
                        </div>
                        <Badge variant="secondary" className="bg-emerald-500/40 text-emerald-100 border-emerald-400/50 text-xs px-2 py-0.5 font-medium self-start sm:self-center whitespace-nowrap">
                          {improvement.improvement}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="space-y-4 sm:space-y-6">
            {/* Competitive Advantages */}
            <div>
              <h3 className="text-lg sm:text-xl md:text-2xl text-white mb-3 sm:mb-4 md:mb-6 flex items-center gap-2 sm:gap-3 px-2 font-semibold">
                <Target className="h-5 w-5 sm:h-6 sm:w-6 text-orange-400 flex-shrink-0" />
                <span className="break-words">경쟁 우위</span>
              </h3>
              
              <motion.div
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 1.0 }}
                className="space-y-3 sm:space-y-4"
              >
                {competitiveAdvantages.map((advantage, index) => (
                  <div key={index} className="bg-white/10 border border-white/30 rounded-lg p-2 sm:p-3 md:p-4">
                    <div className="flex items-start gap-2 sm:gap-3">
                      <advantage.icon className="h-4 w-4 sm:h-5 sm:w-5 text-orange-400 mt-0.5 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <h5 className="text-white mb-1 text-sm sm:text-base font-semibold break-words">
                          {advantage.title}
                        </h5>
                        <p className="text-slate-200 text-xs sm:text-sm mb-2 font-medium leading-relaxed break-words">
                          {advantage.description}
                        </p>
                        <Badge variant="outline" className="border-orange-400/60 text-orange-200 bg-orange-500/20 text-xs px-2 py-0.5 font-medium break-words">
                          {advantage.advantage}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* ROI Timeline */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 border border-emerald-500/30 rounded-lg p-3 sm:p-4 md:p-6"
            >
              <h4 className="text-white text-base sm:text-lg mb-3 sm:mb-4 flex items-center gap-2 font-semibold">
                <DollarSign className="h-4 w-4 sm:h-5 sm:w-5 text-emerald-400 flex-shrink-0" />
                <span className="break-words">ROI 타임라인</span>
              </h4>
              
              <div className="space-y-2 sm:space-y-3 md:space-y-4">
                {roi.map((period, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex-1 min-w-0 pr-4">
                      <div className="text-white text-sm sm:text-base font-semibold break-words">
                        {period.period}
                      </div>
                      <div className="text-slate-200 text-xs sm:text-sm font-medium break-words">
                        {period.description}
                      </div>
                    </div>
                    <div className="text-lg sm:text-xl md:text-2xl text-emerald-400 font-bold flex-shrink-0 whitespace-nowrap">
                      {period.value}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom Summary */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="text-center bg-gradient-to-r from-emerald-500/20 to-purple-500/20 border border-emerald-500/40 rounded-lg p-3 sm:p-4 md:p-6"
      >
        <h4 className="text-base sm:text-lg md:text-xl text-white mb-2 font-bold break-words">
          🎯 연간 운영비 40% 절감 및 서비스 품질 90% 향상
        </h4>
        <p className="text-slate-100 text-sm sm:text-base font-medium break-words">
          완전 자동화된 지능형 시스템으로 혁신적인 운영 효율성 달성
        </p>
      </motion.div>
    </motion.div>
  );
}