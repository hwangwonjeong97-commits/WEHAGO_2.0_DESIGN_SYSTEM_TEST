// token.json을 직접 읽어 alias({...})를 최종 값까지 해석하는 로더.
// token.json 하나만 바뀌면 사이트 전체가 자동으로 갱신된다.
import rawTokens from '../token.json'

type Leaf = { $value: string | number; $type?: string; $extensions?: unknown }
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const data = rawTokens as Record<string, any>

// 모든 세트($로 시작하지 않는)를 점표기 경로로 평탄화 (세트명은 제외 — Tokens Studio 참조 규칙과 동일)
const index = new Map<string, Leaf>()

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function walk(node: any, parts: string[]) {
  if (!node || typeof node !== 'object') return
  if ('$value' in node) {
    index.set(parts.join('.'), node as Leaf)
    return
  }
  for (const key of Object.keys(node)) {
    if (key.startsWith('$')) continue
    walk(node[key], [...parts, key])
  }
}
for (const setName of Object.keys(data)) {
  if (setName.startsWith('$')) continue
  walk(data[setName], [])
}

const REF_RE = /^\{(.+)\}$/

export type Resolved = {
  /** 원본 값 (예: "{color.blue.500}" 또는 "#105aff") */
  raw: string | number
  /** 최종 해석된 값 (참조 체인 끝의 실제 값). 참조가 깨지면 null */
  value: string | number | null
  /** 참조였다면 가리키는 경로 */
  ref?: string
  /** 참조가 끊겼으면 true */
  broken: boolean
}

/** {ref} 체인을 최종 값까지 재귀 해석 */
export function resolve(input: string | number, seen: Set<string> = new Set()): Resolved {
  if (typeof input !== 'string') return { raw: input, value: input, broken: false }
  const m = input.match(REF_RE)
  if (!m) return { raw: input, value: input, broken: false }
  const path = m[1]
  if (seen.has(path)) return { raw: input, value: null, ref: path, broken: true }
  seen.add(path)
  const leaf = index.get(path)
  if (!leaf) return { raw: input, value: null, ref: path, broken: true }
  const next = resolve(leaf.$value, seen)
  return { raw: input, value: next.value, ref: path, broken: next.broken }
}

export type TokenEntry = {
  /** 표시용 이름 (경로 마지막 세그먼트) */
  name: string
  /** 그룹 아래 상대 경로 */
  path: string
  raw: string | number
  type?: string
  resolved: Resolved
}

export type TokenGroup = {
  name: string
  entries: TokenEntry[]
}

/** 세트의 특정 top-key(예: color) 아래를, "그룹 → 엔트리" 2단으로 수집 */
export function getGroups(setName: string, topKey: string): TokenGroup[] {
  const root = data[setName]?.[topKey]
  if (!root || typeof root !== 'object') return []
  const groups: TokenGroup[] = []
  for (const groupName of Object.keys(root)) {
    if (groupName.startsWith('$')) continue
    const node = root[groupName]
    const entries: TokenEntry[] = []
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const collect = (n: any, parts: string[]) => {
      if (!n || typeof n !== 'object') return
      if ('$value' in n) {
        entries.push({
          name: parts[parts.length - 1] ?? groupName,
          path: parts.join('.'),
          raw: n.$value,
          type: n.$type,
          resolved: resolve(n.$value),
        })
        return
      }
      for (const k of Object.keys(n)) {
        if (k.startsWith('$')) continue
        collect(n[k], [...parts, k])
      }
    }
    collect(node, [])
    if (entries.length) groups.push({ name: groupName, entries })
  }
  return groups
}

/** 세트의 top-key가 바로 엔트리들인 경우(예: semantic/alpha) */
export function getFlat(setName: string, topKey: string): TokenEntry[] {
  const root = data[setName]?.[topKey]
  if (!root || typeof root !== 'object') return []
  const entries: TokenEntry[] = []
  for (const k of Object.keys(root)) {
    if (k.startsWith('$')) continue
    const n = root[k]
    if (n && typeof n === 'object' && '$value' in n) {
      entries.push({ name: k, path: k, raw: n.$value, type: n.$type, resolved: resolve(n.$value) })
    }
  }
  return entries
}

export const setNames = Object.keys(data).filter((s) => !s.startsWith('$'))
export const primitiveSet = setNames.find((s) => s.startsWith('primitive')) ?? 'primitive/Value'
export const semanticSet = setNames.find((s) => s.startsWith('semantic')) ?? 'semantic/Value'
export const componentSet = setNames.find((s) => s.startsWith('component')) ?? 'component/Light'
