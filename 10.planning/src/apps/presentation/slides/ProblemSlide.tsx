import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Badge } from '../../../components/ui/badge';
import { AlertTriangle, TrendingDown, XCircle, Clock, Database, Users, Shield } from 'lucide-react';
import { motion } from 'motion/react';

export function ProblemSlide() {
  const problems = [
    {
      icon: XCircle,
      title: '데이터 문제',
      description: 'RDBMS/NoSQL/File/IoT 장비별로 분산되어 통합 불가, 표준 스키마/시간대/단위/ID 불일치로 분석 불신, 실시간은 일부만 필요하지만 무분별 수집으로 장애 및 비용 증가',
      impact: '데이터 활용도 30%',
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/20'
    },
    {
      icon: Clock,
      title: '운영 문제',
      description: '알람 오탐/미탐으로 운영 혼란 및 대응 지연, 근본 원인 분석 지연으로 서비스 수준 협약 준수 실패, 통신 오류 누적 시 배치 점검 필요로 실시간 누락',
      impact: '평균 복구 시간 4시간',
      color: 'text-orange-400',
      bgColor: 'bg-orange-500/20'
    },
    {
      icon: AlertTriangle,
      title: '제품 문제',
      description: '제품/펌웨어별 성능 데이터 부족으로 불량 원인 규명 지연, 고객사별 맞춤 서비스 수준 협약 대응 불가로 만족도 및 재구매율 하락',
      impact: '고객 만족도 지속 하락',
      color: 'text-red-400',
      bgColor: 'bg-red-500/20'
    },
    {
      icon: Users,
      title: '서비스 문제',
      description: '원격 제어 및 무선 펌웨어 업데이트 미흡으로 현장 출동 증가 및 운영비용 증가',
      impact: '월 120건 현장 출동',
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/20'
    },
    {
      icon: Shield,
      title: '보안/비용 문제',
      description: '권한 관리 및 감사 체계 미비로 규제 리스크, 불필요한 장기 DB 보관으로 비용 과다',
      impact: '연간 2억원 운영비 초과',
      color: 'text-green-400',
      bgColor: 'bg-green-500/20'
    }
  ];

  const currentSituation = [
    { label: '관리 시스템', value: '7개 분산', status: 'critical' },
    { label: '알람 오탐률', value: '30%', status: 'warning' },
    { label: '현장 출동', value: '월 120건', status: 'critical' },
    { label: '평균 복구시간', value: '4시간', status: 'warning' },
    { label: '데이터 활용도', value: '30%', status: 'critical' },
    { label: '자동화 수준', value: '20%', status: 'critical' }
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
        <h2 className="text-2xl sm:text-3xl md:text-4xl mb-3 sm:mb-4 bg-gradient-to-r from-red-400 via-orange-400 to-red-500 bg-clip-text text-transparent px-2 font-bold break-words">
          현재 직면한 주요 문제점
        </h2>
        <p className="text-base sm:text-lg md:text-xl text-slate-100 max-w-3xl mx-auto px-4 leading-relaxed font-medium break-words">
          분산된 시스템과 수동적 관리 방식으로 인한 비효율성과 높은 운영 비용
        </p>
      </motion.div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
        {/* Problems Grid */}
        <div className="space-y-4 sm:space-y-6">
          <h3 className="text-lg sm:text-xl md:text-2xl text-white mb-3 sm:mb-4 md:mb-6 flex items-center gap-2 sm:gap-3 px-2 font-semibold">
            <AlertTriangle className="h-5 w-5 sm:h-6 sm:w-6 text-red-400 flex-shrink-0" />
            <span className="break-words">핵심 문제점</span>
          </h3>
          
          <div className="grid gap-3 sm:gap-4">
            {problems.map((problem, index) => (
              <motion.div
                key={index}
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <Card className="bg-white/5 border-white/20 hover:bg-white/10 transition-all duration-300">
                  <CardContent className="p-2 sm:p-4 md:p-6">
                    <div className="flex items-start gap-2 sm:gap-3 md:gap-4">
                      <div className={`p-1.5 sm:p-2 md:p-3 rounded-lg ${problem.bgColor} flex-shrink-0 mt-0.5`}>
                        <problem.icon className={`h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 ${problem.color}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm sm:text-base md:text-lg text-white mb-1 sm:mb-2 font-semibold break-words">
                          {problem.title}
                        </h4>
                        <p className="text-slate-200 text-xs sm:text-sm mb-2 sm:mb-3 leading-relaxed break-words">
                          {problem.description}
                        </p>
                        <Badge variant="destructive" className="bg-red-500/40 text-red-100 border-red-400/60 text-xs px-2 py-1 font-medium break-words">
                          {problem.impact}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Current Situation Dashboard */}
        <div className="space-y-4 sm:space-y-6">
          <h3 className="text-lg sm:text-xl md:text-2xl text-white mb-3 sm:mb-4 md:mb-6 flex items-center gap-2 sm:gap-3 px-2 font-semibold">
            <TrendingDown className="h-5 w-5 sm:h-6 sm:w-6 text-orange-500 flex-shrink-0" />
            <span className="break-words">현재 상황 지표</span>
          </h3>
          
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="bg-white/5 border border-white/20 rounded-lg p-2 sm:p-4 md:p-6"
          >
            <div className="space-y-2 sm:space-y-3 md:space-y-4">
              {currentSituation.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="flex items-center justify-between p-2 sm:p-3 md:p-4 bg-white/5 rounded-lg"
                >
                  <span className="text-slate-300 text-xs sm:text-sm md:text-base flex-1 min-w-0 pr-2 break-words">
                    {item.label}
                  </span>
                  <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
                    <span className="text-white text-sm sm:text-base md:text-lg font-semibold whitespace-nowrap">
                      {item.value}
                    </span>
                    <div className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full flex-shrink-0 ${
                      item.status === 'critical' ? 'bg-red-500' :
                      item.status === 'warning' ? 'bg-orange-500' : 'bg-green-500'
                    }`}></div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Key Impact */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 sm:p-4 md:p-6"
          >
            <h4 className="text-white text-sm sm:text-base md:text-lg mb-3 sm:mb-4 flex items-center gap-2 font-semibold">
              <AlertTriangle className="h-4 w-4 sm:h-5 sm:w-5 text-red-400 flex-shrink-0" />
              <span className="break-words">비즈니스 임팩트</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-center">
              <div>
                <div className="text-lg sm:text-xl md:text-2xl text-red-400 mb-1 font-bold break-words">
                  연간 2억원
                </div>
                <div className="text-xs sm:text-sm text-slate-300 break-words">운영비 초과</div>
              </div>
              <div>
                <div className="text-lg sm:text-xl md:text-2xl text-orange-400 mb-1 font-bold break-words">
                  고객 만족도
                </div>
                <div className="text-xs sm:text-sm text-slate-300 break-words">지속 하락</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom CTA */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="text-center bg-gradient-to-r from-red-500/20 to-orange-500/20 border border-red-500/40 rounded-lg p-3 sm:p-4 md:p-6"
      >
        <h4 className="text-base sm:text-lg md:text-xl text-white mb-2 px-2 font-bold break-words">
          이러한 문제들을 해결하기 위한 통합 솔루션이 필요합니다
        </h4>
        <p className="text-sm sm:text-base text-slate-100 px-2 font-medium break-words">
          데이터 통합 플랫폼을 통한 지능형 자동화가 해답입니다
        </p>
      </motion.div>
    </motion.div>
  );
}