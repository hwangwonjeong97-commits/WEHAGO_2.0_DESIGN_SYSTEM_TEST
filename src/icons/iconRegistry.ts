import type { FC, SVGProps } from 'react'

export type IconCategory = 'monochrome' | 'multicolor'
export type IconGroup = 'Action' | 'Communication' | 'Finance' | 'File' | 'Navigation' | 'Productivity' | 'Service' | 'User' | 'Status'

export interface IconEntry {
  id: string
  label: string
  category: IconCategory
  group: IconGroup
  tags: string[]
  Component: FC<SVGProps<SVGSVGElement>>
}

import IcAddress       from './monochrome/IcAddress'
import IcCalculate     from './monochrome/IcCalculate'
import IcCorporateCard from './monochrome/IcCorporateCard'
import IcExpense       from './monochrome/IcExpense'
import IcFactoring     from './monochrome/IcFactoring'
import IcIdTime        from './monochrome/IcIdTime'
import IcIndividual    from './monochrome/IcIndividual'
import IcMail          from './monochrome/IcMail'
import IcMindmap       from './monochrome/IcMindmap'
import IcOneaiApi      from './monochrome/IcOneaiApi'
import IcQwen          from './monochrome/IcQwen'
import IcT             from './monochrome/IcT'
import IcTodo          from './monochrome/IcTodo'

export const icons: IconEntry[] = [
  {
    id: 'IcMail',
    label: 'Mail',
    category: 'monochrome',
    group: 'Communication',
    tags: ['mail', 'email', 'envelope', 'message', 'inbox', '메일', '이메일', '편지', '메시지', '받은편지함'],
    Component: IcMail,
  },
  {
    id: 'IcTodo',
    label: 'Todo',
    category: 'monochrome',
    group: 'Productivity',
    tags: ['todo', 'task', 'checklist', 'check', 'done', 'complete', '할일', '체크리스트', '투두', '완료', '작업'],
    Component: IcTodo,
  },
  {
    id: 'IcMindmap',
    label: 'Mindmap',
    category: 'monochrome',
    group: 'Productivity',
    tags: ['mindmap', 'mind map', 'diagram', 'connect', 'node', 'tree', 'graph', '마인드맵', '다이어그램', '연결', '노드', '트리'],
    Component: IcMindmap,
  },
  {
    id: 'IcCalculate',
    label: 'Calculate',
    category: 'monochrome',
    group: 'Productivity',
    tags: ['calculate', 'calculator', 'math', 'number', 'compute', '계산기', '계산', '수학', '숫자'],
    Component: IcCalculate,
  },
  {
    id: 'IcAddress',
    label: 'Address',
    category: 'monochrome',
    group: 'User',
    tags: ['address', 'contact', 'person', 'profile', 'phonebook', 'id card', '주소록', '연락처', '명함', '프로필', '아이디카드'],
    Component: IcAddress,
  },
  {
    id: 'IcIdTime',
    label: 'ID Time',
    category: 'monochrome',
    group: 'User',
    tags: ['id', 'time', 'clock', 'identity', 'schedule', 'attendance', 'hr', '아이디', '시간', '근태', '출퇴근', '일정', '인사'],
    Component: IcIdTime,
  },
  {
    id: 'IcIndividual',
    label: 'Individual',
    category: 'monochrome',
    group: 'File',
    tags: ['individual', 'personal', 'folder', 'file', 'document', 'private', '개인', '개인파일', '폴더', '문서', '파일'],
    Component: IcIndividual,
  },
  {
    id: 'IcCorporateCard',
    label: 'Corporate Card',
    category: 'monochrome',
    group: 'Finance',
    tags: ['corporate', 'card', 'credit card', 'company card', 'payment', 'business', '법인카드', '카드', '기업', '결제', '회사카드'],
    Component: IcCorporateCard,
  },
  {
    id: 'IcExpense',
    label: 'Expense',
    category: 'monochrome',
    group: 'Finance',
    tags: ['expense', 'spending', 'chart', 'cost', 'budget', 'money', 'finance', '지출', '경비', '비용', '예산', '돈', '재무'],
    Component: IcExpense,
  },
  {
    id: 'IcFactoring',
    label: 'Factoring',
    category: 'monochrome',
    group: 'Finance',
    tags: ['factoring', 'finance', 'loan', 'credit', 'receivable', 'debt', '팩토링', '금융', '대출', '채권', '신용'],
    Component: IcFactoring,
  },
  {
    id: 'IcT',
    label: 'T Service',
    category: 'monochrome',
    group: 'Service',
    tags: ['t', 't service', 'wehago t', 'text', 'type', '더존T', '서비스', '텍스트'],
    Component: IcT,
  },
  {
    id: 'IcQwen',
    label: 'Qwen',
    category: 'monochrome',
    group: 'Service',
    tags: ['qwen', 'ai', 'llm', 'alibaba', 'model', 'language model', '큰', 'AI서비스', '언어모델', '인공지능'],
    Component: IcQwen,
  },
  {
    id: 'IcOneaiApi',
    label: 'ONE:AI API',
    category: 'monochrome',
    group: 'Service',
    tags: ['oneai', 'api', 'ai', 'one ai', 'integration', 'connect', '원에이아이', 'AI', '더존AI', '연동', '인공지능'],
    Component: IcOneaiApi,
  },
]

export function getIconsByCategory(category: IconCategory): IconEntry[] {
  return icons.filter(icon => icon.category === category)
}

export function searchIcons(query: string, category?: IconCategory): IconEntry[] {
  const q = query.toLowerCase().trim()
  const pool = category ? getIconsByCategory(category) : icons
  if (!q) return pool
  return pool.filter(icon =>
    icon.id.toLowerCase().includes(q) ||
    icon.label.toLowerCase().includes(q) ||
    icon.group.toLowerCase().includes(q) ||
    icon.tags.some(tag => tag.toLowerCase().includes(q))
  )
}
