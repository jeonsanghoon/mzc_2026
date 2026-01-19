import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Badge } from '../../../components/ui/badge';
import { Progress } from '../../../components/ui/progress';
import { CheckCircle2, Clock, Calendar, Target, Zap, Users, Settings, Database, BarChart3 } from 'lucide-react';
import { motion } from 'motion/react';

export function RoadmapSlide() {
  const phases = [
    {
      phase: 'Phase 0',
      title: '설계 및 목표설정 (병렬)',
      duration: '1-2개월',
      description: '프로젝트 요구사항 분석 및 목표설정, 시스템 아키텍처 설계 (1단계와 병렬 진행)',
      objectives: [
        '프로젝트 요구사항 분석 및 정리',
        '목표 설정 및 성공 기준 정의',
        '시스템 아키텍처 설계',
        '데이터 모델 설계',
        '기술 스택 검토 및 개발 계획 수립',
        '고객사 요구사항 정리 및 커스터마이징 범위 결정'
      ],
      deliverables: [
        '요구사항 명세서',
        '목표 및 성공 기준 문서',
        '시스템 아키텍처 문서',
        '데이터 모델 설계서',
        '개발 계획서',
        '커스터마이징 범위 정의서'
      ],
      milestones: [
        { week: 2, task: '요구사항 분석 완료' },
        { week: 4, task: '목표 및 아키텍처 설계 완료' },
        { week: 8, task: 'Phase 0 완료 및 검토' }
      ],
      icon: Target,
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/30',
      progress: 100
    },
    {
      phase: 'Phase 1',
      title: '데이터 수집 및 통합',
      duration: '2-3개월',
      description: 'VPN 연결을 통한 다중 프로토콜 데이터 수집 및 통합',
      objectives: [
        'VPN 연결 설정 (Site-to-Site VPN)',
        '다중 프로토콜 통합 (TCP/MQTT/REST API)',
        '데이터 표준화 및 변환 시스템 구축',
        'Data Contract 기반 품질 검증'
      ],
      deliverables: [
        'VPN 연결 인프라',
        '다중 프로토콜 게이트웨이',
        '데이터 변환 파이프라인',
        '데이터 품질 관리 시스템'
      ],
      milestones: [
        { week: 6, task: 'VPN 연결 설정' },
        { week: 8, task: 'TCP 수신 인프라' },
        { week: 10, task: 'MQTT/REST 통합' },
        { week: 12, task: 'Phase 1 완료 및 검증' }
      ],
      icon: Settings,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/30',
      progress: 100
    },
    {
      phase: 'Phase 2',
      title: '데이터 저장 및 집계 자동화',
      duration: '3-4개월',
      description: 'CQRS 패턴 적용 및 집계 데이터 생성 자동화',
      objectives: [
        'DocumentDB/Aurora CQRS 패턴 적용',
        'Hot/Warm/Cold 레이어 구축',
        '제품별 시간별/일별 집계 자동화',
        '고객별 일별 집계 및 계산식 적용 자동화'
      ],
      deliverables: [
        'CQRS 데이터베이스 구축',
        '3계층 데이터 저장소',
        '집계 데이터 자동 생성 시스템',
        '계산식 적용 자동화'
      ],
      milestones: [
        { week: 18, task: 'CQRS 패턴 적용' },
        { week: 22, task: '집계 자동화 구축' },
        { week: 26, task: '계산식 적용 시스템' },
        { week: 28, task: 'Phase 2 완료 및 검증' }
      ],
      icon: Database,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/30',
      progress: 60
    },
    {
      phase: 'Phase 3',
      title: '알람 처리',
      duration: '5-6개월',
      description: '룰 기반 알람 시스템 구축',
      objectives: [
        '룰 기반 알람 시스템 구축',
        '알람/에스컬레이션 처리',
        '이력 관리 시스템'
      ],
      deliverables: [
        '룰 엔진 시스템',
        '알람 처리 시스템',
        '이력 관리 시스템'
      ],
      milestones: [
        { week: 20, task: '룰 엔진 구축' },
        { week: 22, task: '알람 시스템 구현' },
        { week: 24, task: 'AWS 모니터링 통합' },
        { week: 26, task: 'Phase 3 완료 및 검증' }
      ],
      icon: BarChart3,
      color: 'text-orange-400',
      bgColor: 'bg-orange-500/10',
      borderColor: 'border-orange-500/30',
      progress: 50
    },
    {
      phase: 'Phase 4',
      title: '자동화 확장 (병렬 진행)',
      duration: '2-8개월',
      description: '원격 제어/OTA 자동화 및 프론트엔드 개발 (프로젝트 진행 중 병렬 수행)',
      objectives: [
        'Shadow 기반 원격 제어 시스템',
        'OTA 파이프라인 구축',
        '프론트엔드 관리 화면 개발 (병렬)',
        '고객 관리 및 데이터 조회 화면 개발 (병렬)'
      ],
      deliverables: [
        '원격 제어 시스템',
        'OTA 업데이트 시스템',
        '관리 대시보드',
        '고객 관리 화면'
      ],
      milestones: [
        { week: 12, task: '프론트엔드 개발 시작' },
        { week: 20, task: '원격 제어 구현' },
        { week: 26, task: 'OTA 시스템 구축' },
        { week: 32, task: '프론트엔드 개발 완료' }
      ],
      icon: Zap,
      color: 'text-green-400',
      bgColor: 'bg-green-500/10',
      borderColor: 'border-green-500/30',
      progress: 30
    },
    {
      phase: 'Phase 5',
      title: '배포 시스템 구축 (병렬)',
      duration: '7-8개월',
      description: 'Terraform, Lambda, 백엔드, 프론트엔드 배포 시스템 구축 (마지막 2개월 병행)',
      objectives: [
        'Terraform 인프라 배포 자동화',
        'Lambda 시스템 배포 자동화',
        '백엔드 배포 시스템 (ECS)',
        '프론트엔드 배포 시스템 (S3 + CloudFront)',
        'CI/CD 파이프라인 구축'
      ],
      deliverables: [
        'Terraform 배포 파이프라인',
        'Lambda 배포 시스템',
        '백엔드 배포 시스템',
        '프론트엔드 배포 시스템',
        'CI/CD 파이프라인'
      ],
      milestones: [
        { week: 28, task: 'Terraform 배포 구축' },
        { week: 30, task: 'Lambda 배포 시스템' },
        { week: 32, task: '백엔드/프론트엔드 배포' },
        { week: 34, task: 'CI/CD 파이프라인 완료' }
      ],
      icon: Settings,
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/30',
      progress: 20
    },
    {
      phase: 'Phase 6',
      title: '서비스 검수 및 보완',
      duration: '8개월',
      description: 'AWS 시스템 모니터링 구축 및 검수, 보완 작업',
      objectives: [
        'AWS 시스템 모니터링 구축 (CloudWatch 통합)',
        '인프라 모니터링 및 성능 지표 수집',
        '스트레스 테스트 및 성능 검증',
        '보안 검수 및 취약점 점검',
        '서비스 안정성 검증 및 버그 수정'
      ],
      deliverables: [
        'AWS 시스템 모니터링 시스템',
        '실시간 모니터링 대시보드',
        '성능 테스트 리포트',
        '보안 검수 결과',
        '운영 가이드 및 문서화'
      ],
      milestones: [
        { week: 32, task: '모니터링 시스템 구축' },
        { week: 34, task: '스트레스 테스트' },
        { week: 35, task: '보안 검수 및 보완' },
        { week: 36, task: '최종 검수 완료' }
      ],
      icon: CheckCircle2,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/30',
      progress: 10
    }
  ];

  const riskMitigation = [
    {
      risk: '프론트엔드 개발자 합류 불가 (외부 인원)',
      mitigation: '방안 1: 추가 프론트엔드 개발자 2명 투입 (8개월 유지) / 방안 2: 기존 인원으로 진행 시 프로젝트 기간 2개월 추가 (총 10개월)',
      probability: 'Medium',
      impact: 'High'
    },
    {
      risk: '데이터 마이그레이션 복잡성',
      mitigation: '단계적 마이그레이션 및 병렬 운영',
      probability: 'Medium',
      impact: 'High'
    },
    {
      risk: '시스템 통합 지연',
      mitigation: 'API 우선 설계 및 모듈식 개발',
      probability: 'Medium',
      impact: 'Medium'
    }
  ];

  const resources = [
    {
      role: 'PM/아키텍트',
      count: 1,
      responsibility: '전체 프로젝트 관리 및 아키텍처 설계 (전상훈)'
    },
    {
      role: 'UI/UX 디자이너',
      count: 1,
      responsibility: '화면 구체화 및 디자인 - 와이어프레임/프로토타입 제작, UI/UX 디자인, 디자인 시스템 구축'
    },
    {
      role: '백엔드 개발자',
      count: 2,
      responsibility: 'AWS 인프라 연동 및 백엔드 API 개발 - 유재후, 천필호 (겸직 가능)'
    },
    {
      role: '프론트엔드 개발자',
      count: 2,
      responsibility: '웹 프론트엔드 화면 개발 - 이세희, 이진경 (겸직 가능)'
    },
    {
      role: 'AI/ML 개발자 (별도 프로젝트)',
      count: 2,
      responsibility: 'AI/ML 분석 모델 개발 - 별도 개발 프로젝트로 진행'
    },
    {
      role: 'SA (선택적)',
      count: 1,
      responsibility: 'AWS 인프라 구성 - VPN 구성, CI/CD 파이프라인 구성, 구성된 인프라 내역 공유 및 문서화'
    }
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
        <h2 className="text-2xl sm:text-3xl md:text-4xl mb-3 sm:mb-4 bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-400 bg-clip-text text-transparent px-2 font-bold break-words">
          5. 구현 로드맵
        </h2>
        <p className="text-base sm:text-lg md:text-xl text-slate-100 max-w-3xl mx-auto px-4 leading-relaxed font-medium break-words">
          8개월간의 단계적 구현 계획 및 마일스톤
        </p>
      </motion.div>

      <div className="flex-1 space-y-6 sm:space-y-8">
        {/* Phase Timeline */}
        <div>
          <h3 className="text-lg sm:text-xl md:text-2xl text-white mb-3 sm:mb-4 md:mb-6 flex items-center gap-2 sm:gap-3 px-2 font-semibold">
            <Calendar className="h-5 w-5 sm:h-6 sm:w-6 text-orange-400 flex-shrink-0" />
            <span className="break-words">4단계 구현 계획 (8개월)</span>
          </h3>
          
          <div className="space-y-3 sm:space-y-4 md:space-y-6">
            {phases.map((phase, index) => (
              <motion.div
                key={index}
                initial={{ x: index % 2 === 0 ? -50 : 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 + index * 0.2 }}
              >
                <Card className={`bg-white/5 border-2 ${phase.borderColor} hover:bg-white/10 transition-all duration-300`}>
                  <CardContent className="p-2 sm:p-4 md:p-6">
                    <div className="flex flex-col gap-3 sm:gap-4 md:gap-6">
                      {/* Phase Info */}
                      <div className="flex-1">
                        <div className="flex items-start gap-2 sm:gap-3 md:gap-4 mb-2 sm:mb-3 md:mb-4">
                          <div className={`p-1.5 sm:p-2 md:p-3 rounded-lg ${phase.bgColor} flex-shrink-0 mt-0.5`}>
                            <phase.icon className={`h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 ${phase.color}`} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-1 sm:mb-2">
                              <h4 className="text-base sm:text-lg text-white font-semibold break-words">
                                {phase.phase}: {phase.title}
                              </h4>
                              <Badge variant="outline" className="border-white/40 text-slate-100 bg-white/5 self-start text-xs px-2 py-1 font-medium whitespace-nowrap">
                                {phase.duration}
                              </Badge>
                            </div>
                            <p className="text-slate-200 text-xs sm:text-sm font-medium break-words">
                              {phase.description}
                            </p>
                          </div>
                        </div>

                        {/* Progress */}
                        <div className="mb-3 sm:mb-4">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-slate-200 text-xs sm:text-sm font-medium">진행률</span>
                            <span className="text-white text-xs sm:text-sm font-semibold">{phase.progress}%</span>
                          </div>
                          <Progress value={phase.progress} className="h-2" />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
                          {/* Objectives */}
                          <div>
                            <h5 className="text-white text-xs sm:text-sm mb-2 sm:mb-3 font-semibold">주요 목표</h5>
                            <div className="space-y-1 sm:space-y-2">
                              {phase.objectives.map((objective, objIndex) => (
                                <div key={objIndex} className="flex items-start gap-1 sm:gap-2 text-xs sm:text-sm">
                                  <CheckCircle2 className="h-3 w-3 sm:h-4 sm:w-4 text-green-400 mt-0.5 flex-shrink-0" />
                                  <span className="text-slate-200 font-medium break-words">{objective}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Deliverables */}
                          <div>
                            <h5 className="text-white text-xs sm:text-sm mb-2 sm:mb-3 font-semibold">주요 산출물</h5>
                            <div className="flex flex-wrap gap-1 sm:gap-2">
                              {phase.deliverables.map((deliverable, delIndex) => (
                                <Badge 
                                  key={delIndex} 
                                  variant="outline" 
                                  className="border-white/40 text-slate-100 bg-white/5 text-xs px-2 py-1 font-medium break-words"
                                >
                                  {deliverable}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Milestones */}
                        <div className="mt-3 sm:mt-4 col-span-1 sm:col-span-2">
                          <h5 className="text-white text-xs sm:text-sm mb-2 sm:mb-3 font-semibold">주요 마일스톤</h5>
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-1 sm:gap-2">
                            {phase.milestones.map((milestone, msIndex) => (
                              <div key={msIndex} className="bg-white/10 p-1.5 sm:p-2 rounded text-xs text-center">
                                <div className="text-white mb-0.5 sm:mb-1 font-semibold">{milestone.week}주차</div>
                                <div className="text-slate-200 text-xs leading-tight break-words">{milestone.task}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Resources & Risk Management */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
          {/* Team Resources */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            <h3 className="text-lg sm:text-xl md:text-2xl text-white mb-3 sm:mb-4 md:mb-6 flex items-center gap-2 sm:gap-3 px-2 font-semibold">
              <Users className="h-5 w-5 sm:h-6 sm:w-6 text-blue-400 flex-shrink-0" />
              <span className="break-words">팀 구성</span>
            </h3>
            
            <div className="bg-white/5 border border-white/20 rounded-lg p-2 sm:p-4 md:p-6">
              <div className="space-y-3 sm:space-y-4">
                {resources.map((resource, index) => (
                  <div key={index} className="flex items-center justify-between p-2 sm:p-3 bg-white/5 rounded-lg">
                    <div className="flex-1 min-w-0 pr-2">
                      <div className="text-white mb-0.5 sm:mb-1 text-sm sm:text-base font-semibold break-words">
                        {resource.role}
                      </div>
                      <div className="text-slate-200 text-xs sm:text-sm font-medium break-words">
                        {resource.responsibility}
                      </div>
                    </div>
                    <div className="text-center flex-shrink-0">
                      <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-500/30 rounded-full flex items-center justify-center text-blue-200 text-xs sm:text-sm font-semibold">
                        {resource.count}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-blue-500/20 border border-blue-500/30 rounded-lg">
                <div className="text-center">
                  <div className="text-xl sm:text-2xl text-blue-400 mb-1 font-bold">본 프로젝트 6-7명</div>
                  <div className="text-slate-200 text-xs sm:text-sm font-medium">+ AI/ML 2명 (별도, SA 선택적)</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Risk Management */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 1.4 }}
          >
            <h3 className="text-lg sm:text-xl md:text-2xl text-white mb-3 sm:mb-4 md:mb-6 flex items-center gap-2 sm:gap-3 px-2 font-semibold">
              <Target className="h-5 w-5 sm:h-6 sm:w-6 text-orange-400 flex-shrink-0" />
              <span className="break-words">리스크 관리</span>
            </h3>
            
            <div className="space-y-3 sm:space-y-4">
              {riskMitigation.map((risk, index) => (
                <div key={index} className="bg-white/5 border border-white/20 rounded-lg p-2 sm:p-3 md:p-4">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-2">
                    <h5 className="text-white text-sm sm:text-base font-semibold flex-1 min-w-0 break-words">
                      {risk.risk}
                    </h5>
                    <div className="flex gap-1 sm:gap-2 self-start flex-shrink-0">
                      <Badge 
                        variant="outline" 
                        className={`text-xs px-1.5 py-0.5 font-medium whitespace-nowrap ${
                          risk.probability === 'High' ? 'border-red-500/60 text-red-200 bg-red-500/20' :
                          risk.probability === 'Medium' ? 'border-orange-500/60 text-orange-200 bg-orange-500/20' :
                          'border-green-500/60 text-green-200 bg-green-500/20'
                        }`}
                      >
                        {risk.probability}
                      </Badge>
                      <Badge 
                        variant="outline" 
                        className={`text-xs px-1.5 py-0.5 font-medium whitespace-nowrap ${
                          risk.impact === 'High' ? 'border-red-500/60 text-red-200 bg-red-500/20' :
                          risk.impact === 'Medium' ? 'border-orange-500/60 text-orange-200 bg-orange-500/20' :
                          'border-green-500/60 text-green-200 bg-green-500/20'
                        }`}
                      >
                        {risk.impact}
                      </Badge>
                    </div>
                  </div>
                  <p className="text-slate-200 text-xs sm:text-sm font-medium break-words">
                    {risk.mitigation}
                  </p>
                </div>
              ))}
            </div>

            {/* Success Factors */}
            <div className="mt-4 sm:mt-6 bg-green-500/10 border border-green-500/20 rounded-lg p-3 sm:p-4">
              <h5 className="text-white mb-2 sm:mb-3 flex items-center gap-2 text-sm sm:text-base font-semibold">
                <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-green-400 flex-shrink-0" />
                <span className="break-words">성공 요인</span>
              </h5>
              <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm text-slate-200 font-medium">
                <div className="break-words">• 단계적 구현으로 리스크 최소화</div>
                <div className="break-words">• 검증된 AWS 서비스 활용</div>
                <div className="break-words">• 전문 개발팀 구성</div>
                <div className="break-words">• 지속적인 모니터링 및 개선</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Timeline Summary */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="text-center bg-gradient-to-r from-orange-500/20 to-yellow-500/20 border border-orange-500/40 rounded-lg p-3 sm:p-4 md:p-6"
      >
        <h4 className="text-base sm:text-lg md:text-xl text-white mb-2 font-bold break-words">
          📅 8개월 완성 · 단계적 구현 · 점진적 가치 실현
        </h4>
        <p className="text-slate-100 text-sm sm:text-base font-medium break-words">
          각 단계별로 즉시 비즈니스 가치를 확인하며 안정적인 구현
        </p>
      </motion.div>
    </motion.div>
  );
}