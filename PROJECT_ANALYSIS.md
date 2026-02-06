# Your Wedding - 프로젝트 분석 보고서

## 목차
1. [프로젝트 개요](#1-프로젝트-개요)
2. [아키텍처 분석](#2-아키텍처-분석)
3. [발견된 문제점](#3-발견된-문제점)
4. [보안 취약점](#4-보안-취약점)
5. [성능 최적화 기회](#5-성능-최적화-기회)
6. [코드 품질 개선사항](#6-코드-품질-개선사항)
7. [권장 수정사항 요약](#7-권장-수정사항-요약)

---

## 1. 프로젝트 개요

### 기술 스택
- **프레임워크**: Next.js 15.0.7 (App Router)
- **UI 라이브러리**: Mantine 7.15.2
- **상태 관리**: TanStack React Query 5.66.9
- **백엔드**: Supabase (PostgreSQL)
- **애니메이션**: Framer Motion 12.4.1
- **언어**: TypeScript 5.5.2

### 주요 기능
- 결혼식 청첩장 웹 애플리케이션
- 방명록 CRUD 기능 (무한 스크롤)
- 갤러리 이미지 뷰어
- 네이버 지도 연동
- 카카오 공유 기능
- 계좌번호 복사 기능

---

## 2. 아키텍처 분석

### 장점
1. **Server Actions 활용**: 서버 사이드 로직이 잘 분리됨
2. **React Query 사용**: 서버 상태 관리가 효율적
3. **Lazy Loading 구현**: Intersection Observer를 활용한 지연 로딩
4. **모듈화된 컴포넌트**: 컴포넌트가 기능별로 잘 분리됨

### 개선이 필요한 부분
1. **Template vs Layout 사용 혼란**: `layout.tsx`에서 `Template`을 직접 import하여 사용 중
2. **코드 중복**: LazySections.tsx에서 반복적인 패턴

---

## 3. 발견된 문제점

### 3.1 심각한 버그 (Critical)

#### 3.1.1 QueryClient 인스턴스 생성 위치 문제 - ✅ 해결됨
**파일**: `app/template.tsx:17`
```typescript
const queryClient = new QueryClient();
```
**문제점**: QueryClient가 컴포넌트 외부에서 생성되어 모든 사용자가 같은 인스턴스를 공유하게 됨. 서버에서 렌더링 시 데이터 누수 가능성이 있음.

**해결 완료**: useState를 사용하여 컴포넌트 내부에서 QueryClient 인스턴스 생성
```typescript
const [queryClient] = useState(
  () =>
    new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 1000 * 60 * 5,
          gcTime: 1000 * 60 * 30,
        },
      },
    })
);
```

#### 3.1.2 React Hook 규칙 위반 - ✅ 해결됨
**파일**: `hooks/useGuestBookController.ts:36-42`
```typescript
const getGuestBook = (id: number) => {
  return useQuery<GuestBookDto | null>({
    queryKey: ['guestBook', id],
    queryFn: () => getGuestBookById(id),
    enabled: !!id,
  });
};
```
**문제점**: 함수 내부에서 `useQuery` 훅을 호출하고 있음. React Hook은 반드시 컴포넌트 또는 커스텀 훅의 최상위 레벨에서만 호출해야 함.

**해결 완료**: 별도의 커스텀 훅 `useGuestBook`으로 분리
```typescript
export const useGuestBook = (id: number) => {
  return useQuery<GuestBookDto | null>({
    queryKey: ['guestBook', id],
    queryFn: () => getGuestBookById(id),
    enabled: !!id,
  });
};
```

#### 3.1.3 동일한 Hook 규칙 위반 - ✅ 해결됨
**파일**: `hooks/useGuestBookController.ts:44-48`
```typescript
const getIsPasswordMatch = () =>
  useMutation({
    mutationFn: ({ id, password }: { id: number; password: string }) =>
      checkGuestBookPassword(id, password),
  });
```
**문제점**: 마찬가지로 함수 내부에서 `useMutation`을 호출

**해결 완료**: 별도의 커스텀 훅 `usePasswordMatch`로 분리

### 3.2 중요 버그 (Major)

#### 3.2.1 네이버 지도 스크립트 URL 오타 - ✅ 해결됨
**파일**: `components/Contact/index.tsx:100`
```typescript
mapScript.src = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId==${process.env.NEXT_MAP_CLIENT_ID}`;
```
**문제점**: `ncpKeyId==` - 등호가 두 개임 (오타)

**해결 완료**: `ncpKeyId=`로 수정

#### 3.2.2 환경 변수 접근 오류 가능성 - ✅ 해결됨
**파일**: `components/Contact/index.tsx:100`
**문제점**: 클라이언트 컴포넌트에서 `process.env.NEXT_MAP_CLIENT_ID` 접근 - `NEXT_PUBLIC_` 접두사가 없으면 클라이언트에서 undefined

**해결 완료**: 환경 변수명을 `NEXT_PUBLIC_MAP_CLIENT_ID`로 변경

#### 3.2.3 useEffect 의존성 배열 누락 - ✅ 해결됨
**파일**: `components/GuestBookForm/index.tsx:37`
```typescript
useEffect(() => {
  if (data) {
    form.setValues({...});
  }
}, [data]); // form이 의존성에 없음
```
**문제점**: `form` 객체가 의존성 배열에 없음. ESLint 경고 발생 가능.

**해결 완료**: `setValues`를 구조 분해 할당하여 의존성 배열에 추가

#### 3.2.4 useEffect 의존성 배열 누락 (2) - ✅ 해결됨
**파일**: `components/Gallery/index.tsx:43`
```typescript
useEffect(() => {
  if (currentImageIndex >= limit) {
    handleLoadMore();
  }
}, [currentImageIndex]); // limit, handleLoadMore 누락
```

**해결 완료**: `handleLoadMore`를 `useCallback`으로 감싸고, `limit`, `handleLoadMore` 의존성 추가

#### 3.2.5 PasswordForm useEffect 의존성 문제 - ✅ 해결됨
**파일**: `components/PasswordForm/index.tsx:29-33`
```typescript
useEffect(() => {
  if (isSuccess && !!data) {
    closeModal(id);
  }
}, [isSuccess, data, closeModal]); // id 누락
```

**해결 완료**: `id`를 의존성 배열에 추가

### 3.3 경미한 버그 (Minor)

#### 3.3.1 Modal key로 index 사용 - ✅ 해결됨
**파일**: `components/Modal/index.tsx:67`
```typescript
key={index}
```
**문제점**: 배열 인덱스를 key로 사용하면 모달 스택 변경 시 리렌더링 문제 발생 가능

**해결 완료**: `useRef` 카운터를 사용한 고유 ID 생성 (`modal-${++modalIdCounter.current}`)

#### 3.3.2 closeOnClickOutside 로직 반전 - ✅ 해결됨
**파일**: `components/Modal/index.tsx:68`
```typescript
closeOnClickOutside={!modalProps.closeOnClickOutside}
```
**문제점**: 변수명과 실제 동작이 반대로 되어 있어 혼란을 줌

**해결 완료**: 로직 정상화하여 `closeOnClickOutside={modalProps.closeOnClickOutside}`로 수정

---

## 4. 보안 취약점

### 4.1 중요 보안 문제

#### 4.1.1 비밀번호 검증 타이밍 공격 가능성
**파일**: `actions/guestbook.actions.ts:77-91`
**문제점**: 비밀번호 검증 시 ID가 없는 경우와 비밀번호가 틀린 경우의 응답 시간이 다를 수 있음

**권장사항**: 일관된 응답 시간을 위해 dummy 비교 수행

#### 4.1.2 Rate Limiting 부재
**문제점**: 방명록 생성, 비밀번호 검증 등에 Rate Limiting이 없어 브루트포스 공격에 취약

**권장사항**: Supabase RLS 또는 미들웨어에서 Rate Limiting 구현

#### 4.1.3 입력값 길이 제한 부재 - ✅ 해결됨
**파일**: `actions/guestbook.actions.ts`
**문제점**: 서버 측에서 name, content, password 길이 검증이 없음

**해결 완료**: `validateGuestBookInput` 함수 추가하여 서버 측 입력값 검증 구현
```typescript
const VALIDATION = {
  NAME_MIN_LENGTH: 2,
  NAME_MAX_LENGTH: 50,
  CONTENT_MIN_LENGTH: 1,
  CONTENT_MAX_LENGTH: 1000,
  PASSWORD_MIN_LENGTH: 4,
  PASSWORD_MAX_LENGTH: 100,
} as const;
```

### 4.2 경미한 보안 문제

#### 4.2.1 에러 메시지 노출
**파일**: `actions/guestbook.actions.ts:51`
```typescript
console.error('Error fetching guestbook entry:', error);
```
**문제점**: 프로덕션에서 에러 상세 정보가 콘솔에 노출됨

---

## 5. 성능 최적화 기회

### 5.1 즉시 개선 가능

#### 5.1.1 reactStrictMode 비활성화 - ✅ 해결됨
**파일**: `next.config.mjs:12`
```javascript
reactStrictMode: false,
```
**문제점**: 개발 중 잠재적 문제 감지가 어려움

**해결 완료**: `reactStrictMode: true`로 변경

#### 5.1.2 eslint ignoreDuringBuilds - ✅ 해결됨
**파일**: `next.config.mjs:13`
```javascript
eslint: { ignoreDuringBuilds: true },
```
**문제점**: 빌드 시 ESLint 오류가 무시되어 품질 저하 가능

**해결 완료**: `ignoreDuringBuilds: false`로 변경

#### 5.1.3 이미지 최적화 개선
**파일**: `app/page.tsx:31`
```typescript
const imageUrl = getImageUrl('thumb.jpeg');
```
**권장사항**: WebP 형식 사용으로 용량 감소 가능

#### 5.1.4 React Query staleTime 설정 - ✅ 해결됨
**파일**: `hooks/useTotalController.ts`
**문제점**: staleTime이 설정되지 않아 불필요한 리페치 발생 가능

**해결 완료**: 모든 쿼리에 staleTime, gcTime 설정 추가
```typescript
staleTime: 1000 * 60 * 5, // 5분
gcTime: 1000 * 60 * 30, // 30분
```

### 5.2 중기 개선사항

#### 5.2.1 이미지 프리로드 최적화
**파일**: `components/Gallery/index.tsx`
**권장사항**: 현재 보이는 이미지 외 다음 이미지 prefetch 구현

#### 5.2.2 방명록 낙관적 업데이트
**파일**: `hooks/useGuestBookController.ts`
**권장사항**: mutation 시 낙관적 업데이트로 UX 개선

```typescript
const { mutate: createGuestBookMutation } = useMutation({
  mutationFn: createGuestBook,
  onMutate: async (newGuestBook) => {
    await queryClient.cancelQueries({ queryKey: ['guestBookList'] });
    const previousData = queryClient.getQueryData(['guestBookList']);
    // 낙관적 업데이트
    return { previousData };
  },
  onError: (err, newGuestBook, context) => {
    queryClient.setQueryData(['guestBookList'], context.previousData);
  },
  onSettled: () => {
    queryClient.invalidateQueries({ queryKey: ['guestBookList'] });
  },
});
```

---

## 6. 코드 품질 개선사항

### 6.1 TypeScript 관련

#### 6.1.1 @ts-expect-error 과다 사용
**파일**: `actions/guestbook.actions.ts` (4개소), `actions/total.actions.ts` (1개소)
**문제점**: Supabase 타입 추론 문제를 `@ts-expect-error`로 우회 중

**권장사항**: Supabase 타입 정의 수정 또는 명시적 타입 캐스팅

```typescript
// 대신
.insert({
  name,
  content,
  password: await hashPassword(password),
} as Database['public']['Tables']['GuestBook']['Insert'])
```

#### 6.1.2 any 타입 사용
**파일들**:
- `app/layout.tsx:37` - `Window.Kakao: any`
- `components/Contact/index.tsx:12` - `Window.naver: any`

**권장사항**: 적절한 타입 정의 추가

### 6.2 코드 스타일

#### 6.2.1 미사용 변수 - ✅ 해결됨
**파일**: `components/Contact/index.tsx:45-46`
```typescript
const [_map, setMap] = useState<any>(null);
const [_centerMarker, setCenterMarker] = useState<any>(null);
```
**문제점**: underscore prefix로 미사용 표시했지만, 실제로 상태가 필요 없다면 제거 권장

**해결 완료**: 미사용 상태 변수 및 setter 완전 제거

#### 6.2.2 주석 처리된 코드 - ✅ 해결됨 (Contact 컴포넌트)
**파일들**:
- `app/page.tsx` - 여러 주석 처리된 import 및 코드
- ~~`components/Contact/index.tsx` - 주석 처리된 InfoWindow 코드~~ ✅ 해결됨
- `app/layout.tsx` - 주석 처리된 Script 태그

**해결 완료**: Contact 컴포넌트의 주석 처리된 코드 삭제 (contentString, infoWindow 관련 코드, Anchor 등)

#### 6.2.3 오타 - ✅ 해결됨
**파일**: `components/GuestBookForm/index.tsx:11`
```typescript
interface GusetBookFormProps {  // "Guset" -> "Guest"
```

**해결 완료**: `GuestBookFormProps`로 수정

### 6.3 일관성 문제

#### 6.3.1 함수 명명 일관성 - ✅ 부분 해결
- ~~`handleCreateGuestBook` vs `handleUpdateguestBook` (대소문자 불일치)~~ ✅ 해결됨
- `getGuestBook` vs `getIsPasswordMatch` (동사 패턴 불일치) - 별도 훅으로 분리됨

**해결 완료**: `handleUpdateguestBook` -> `handleUpdateGuestBook`으로 수정

#### 6.3.2 컴포넌트 export 방식
- 일부: `export const Component = () => {}`
- 일부: `export default function Component() {}`

---

## 7. 권장 수정사항 요약

### 7.1 즉시 수정 필요 (Critical) - ✅ 모두 해결됨

| 우선순위 | 파일 | 문제 | 상태 |
|---------|------|------|------|
| P0 | `app/template.tsx:17` | QueryClient SSR 문제 | ✅ 해결됨 |
| P0 | `hooks/useGuestBookController.ts:36-48` | Hook 규칙 위반 | ✅ 해결됨 |
| P1 | `components/Contact/index.tsx:100` | 환경변수 오타 | ✅ 해결됨 |

### 7.2 빠른 시일 내 수정 권장 (Major) - ✅ 모두 해결됨

| 우선순위 | 파일 | 문제 | 상태 |
|---------|------|------|------|
| P2 | `components/Contact/index.tsx:100` | 환경변수 접근 | ✅ 해결됨 |
| P2 | `next.config.mjs` | ESLint 무시 | ✅ 해결됨 |
| P2 | 다수 파일 | useEffect 의존성 | ✅ 해결됨 |
| P2 | `actions/*.ts` | 입력값 검증 | ✅ 해결됨 |

### 7.3 개선 권장 (Minor) - 부분 해결됨

| 우선순위 | 파일 | 문제 | 상태 |
|---------|------|------|------|
| P3 | 다수 파일 | @ts-expect-error | 미해결 |
| P3 | 다수 파일 | any 타입 사용 | 부분 해결 |
| P3 | 다수 파일 | 주석 처리된 코드 | ✅ Contact 해결됨 |
| P3 | `hooks/*.ts` | React Query 설정 | ✅ 해결됨 |

---

## 부록: 파일별 상세 분석

### A. 핵심 파일 구조

```
your-wedding/
├── app/
│   ├── layout.tsx      # 루트 레이아웃 (메타데이터, 스크립트)
│   ├── page.tsx        # 메인 페이지 (클라이언트 컴포넌트)
│   ├── template.tsx    # 프로바이더 래퍼
│   └── global.css      # 전역 스타일
├── actions/
│   ├── guestbook.actions.ts  # 방명록 CRUD
│   ├── image.actions.ts      # 이미지 조회
│   └── total.actions.ts      # 전체 데이터 조회
├── hooks/
│   ├── useGuestBookController.ts  # 방명록 상태 관리
│   ├── useTotalController.ts      # 전체 데이터 상태
│   ├── useModal.ts                # 모달 컨텍스트
│   └── usePreventZoomGesture.ts   # 줌 방지
├── components/
│   ├── Gallery/         # 갤러리 컴포넌트
│   ├── GuestBooks/      # 방명록 목록
│   ├── GuestBookForm/   # 방명록 작성 폼
│   ├── GuestBookCard/   # 방명록 카드
│   ├── Contact/         # 지도 및 연락처
│   ├── Modal/           # 모달 스택 매니저
│   └── LazySections.tsx # 지연 로딩 래퍼
├── lib/
│   └── supabase.ts      # Supabase 클라이언트
├── utils/
│   ├── password.ts      # 비밀번호 해싱
│   ├── storage.ts       # 스토리지 URL
│   ├── copyData.ts      # 클립보드 복사
│   └── shareLink.ts     # 공유 기능
└── types/
    ├── supabase.ts      # Supabase 자동 생성 타입
    └── wedding.ts       # 웨딩 데이터 타입
```

---

*이 분석 보고서는 2026년 2월 6일에 생성되었습니다.*
*마지막 업데이트: 2026년 2월 6일 - Critical/Major/Minor 버그 수정 완료*
