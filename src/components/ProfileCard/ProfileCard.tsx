import React, { useState } from 'react'

// ─── Figma 원본 아이콘 ─────────────────────────────────────────────────────────

// 쪽지 ic_msg — 18×18
const MsgIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
    <path fillRule="evenodd" clipRule="evenodd" d="M11.7411 1.50781C12.6501 1.50801 13.3084 2.29271 13.3085 3.16528V9.94604L14.5214 11.2146L14.5302 11.2234C15.1398 11.8896 15.108 12.9271 14.4525 13.5525L14.4533 13.5532L11.8283 16.0889L11.8246 16.0918C11.1624 16.7198 10.1182 16.6869 9.49988 16.0112C9.49643 16.0075 9.49297 16.0034 9.48963 15.9995L8.9989 15.4333L8.51038 15.9995C8.50692 16.0035 8.50296 16.0073 8.49939 16.0112C7.88101 16.6868 6.83682 16.7198 6.17469 16.0918L6.17102 16.0889L3.54602 13.5532L3.54676 13.5525C2.89161 12.9271 2.86037 11.8895 3.46985 11.2234C3.47251 11.2205 3.4752 11.2174 3.47791 11.2146L4.63074 10.0098V3.16528C4.63078 2.75975 4.77717 2.37035 5.02552 2.07031C5.04752 2.03899 5.07261 2.00887 5.10169 1.98169C5.10588 1.97777 5.11059 1.97447 5.11487 1.9707C5.38971 1.68906 5.76434 1.50784 6.19812 1.50781H11.7411ZM4.29969 11.9829L4.2345 12.0701C4.1066 12.2835 4.13959 12.5651 4.32386 12.7402L4.32752 12.7439L6.94886 15.2759L7.03162 15.3396C7.23364 15.4659 7.49796 15.4349 7.6659 15.2546L8.25476 14.5728L5.1991 11.0425L4.29969 11.9829ZM5.97693 10.2222L10.3304 15.2517L10.4074 15.3206C10.6 15.4606 10.8685 15.4483 11.0504 15.2759L13.6718 12.7439L13.6754 12.7402C13.8864 12.5401 13.8995 12.2006 13.7003 11.9829L12.3739 10.5972C12.3504 10.5726 12.3298 10.5462 12.3116 10.5188L8.9469 6.91968L5.97693 10.2222ZM5.75574 8.78662L8.17566 6.09424L5.75574 3.50513V8.78662ZM9.70203 6.07959L12.1835 8.73462V3.31982L9.70203 6.07959ZM8.93079 5.25488L11.2885 2.63281H6.47937L8.93079 5.25488Z" fill="#777777"/>
  </svg>
)

// 1:1대화 ic_chat — 18×18
const ChatIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
    <path d="M6.14674 8.26451C6.29223 8.29344 6.42637 8.36469 6.53126 8.46958C6.63605 8.57444 6.70741 8.70798 6.73634 8.85337C6.76528 8.99886 6.75063 9.14992 6.69386 9.28697C6.63713 9.42385 6.5409 9.54077 6.41774 9.62315C6.29446 9.70552 6.14926 9.74982 6.00099 9.74986C5.80215 9.74986 5.61135 9.67068 5.47072 9.53013C5.33009 9.38951 5.25102 9.19873 5.25099 8.99986C5.25099 8.85157 5.29461 8.70642 5.37697 8.58311C5.45938 8.45977 5.57684 8.36375 5.71388 8.30699C5.85083 8.25027 6.00136 8.23564 6.14674 8.26451Z" fill="#777777"/>
    <path d="M9.14674 8.26451C9.29223 8.29344 9.42637 8.36469 9.53126 8.46958C9.63605 8.57444 9.70741 8.70798 9.73634 8.85337C9.76528 8.99886 9.75063 9.14992 9.69386 9.28697C9.63713 9.42385 9.5409 9.54077 9.41774 9.62315C9.29446 9.70552 9.14926 9.74982 9.00099 9.74986C8.80215 9.74986 8.61135 9.67068 8.47072 9.53013C8.33009 9.38951 8.25102 9.19873 8.25099 8.99986C8.25099 8.85157 8.29461 8.70642 8.37697 8.58311C8.45938 8.45977 8.57684 8.36375 8.71388 8.30699C8.85083 8.25027 9.00136 8.23564 9.14674 8.26451Z" fill="#777777"/>
    <path d="M12.1475 8.26451C12.2928 8.2935 12.4265 8.3648 12.5313 8.46958C12.6361 8.57444 12.7074 8.70798 12.7363 8.85337C12.7653 8.99886 12.7506 9.14992 12.6939 9.28697C12.6371 9.42385 12.5409 9.54077 12.4177 9.62315C12.2945 9.70552 12.1493 9.74982 12.001 9.74986C11.8022 9.74986 11.6114 9.67068 11.4707 9.53013C11.3301 9.38951 11.251 9.19873 11.251 8.99986C11.251 8.85157 11.2946 8.70642 11.377 8.58311C11.4594 8.45977 11.5768 8.36375 11.7139 8.30699C11.8509 8.25023 12.002 8.23557 12.1475 8.26451Z" fill="#777777"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M4.79616 3.01744C6.21728 2.01856 7.94815 1.5582 9.67775 1.71885C11.4075 1.87962 13.0236 2.65113 14.2363 3.89488C15.4491 5.13864 16.1795 6.77374 16.2966 8.50694C16.4136 10.24 15.9101 11.9587 14.8757 13.3541C13.8413 14.7494 12.3433 15.7307 10.6511 16.1227C8.99159 16.5069 7.25149 16.2981 5.72999 15.5367L3.96632 16.2779L3.96705 16.2787C3.63915 16.4193 3.27589 16.4582 2.92555 16.3907C2.57528 16.3232 2.25269 16.1523 2.0005 15.9C1.74839 15.6477 1.57781 15.3253 1.51051 14.975C1.44324 14.6246 1.48261 14.262 1.6233 13.9342L2.38869 12.1185C1.66063 10.575 1.49416 8.82435 1.9214 7.17027C2.35589 5.48861 3.37528 4.01634 4.79616 3.01744ZM9.57374 2.83872C8.11038 2.7028 6.64604 3.09232 5.44362 3.93736C4.24121 4.78261 3.37815 6.02919 3.01051 7.45225C2.64307 8.87524 2.79419 10.3829 3.43678 11.7047C3.47991 11.7921 3.50849 11.8854 3.52247 11.9815L3.532 12.0812L3.53053 12.1808C3.52349 12.28 3.49987 12.3778 3.46168 12.4701L3.46022 12.4737L2.65822 14.3744L2.65675 14.378C2.60486 14.4991 2.59023 14.6332 2.615 14.7626C2.6399 14.892 2.70346 15.0113 2.79664 15.1046C2.88986 15.1978 3.00923 15.2613 3.13869 15.2862C3.26805 15.3111 3.40212 15.2963 3.52321 15.2445L3.52687 15.243L5.3506 14.4762C5.47747 14.4197 5.61607 14.3925 5.7549 14.3963C5.84947 14.399 5.94282 14.4176 6.03175 14.4483C6.0739 14.4587 6.116 14.473 6.15626 14.4938C7.46144 15.1695 8.96514 15.3584 10.397 15.027C11.8289 14.6953 13.0966 13.8647 13.9719 12.6839C14.8472 11.5031 15.2729 10.0489 15.1738 8.58238C15.0747 7.11583 14.4569 5.73243 13.4307 4.68003C12.4045 3.62773 11.0373 2.97475 9.57374 2.83872Z" fill="#777777"/>
  </svg>
)

// 메일 ic_mail — 18×18
const MailIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
    <path fillRule="evenodd" clipRule="evenodd" d="M14.2874 3C15.5093 3 16.5 3.99072 16.5 5.21265V12.7874C16.5 14.0093 15.5093 15 14.2874 15H3.71265C2.49072 15 1.5 14.0093 1.5 12.7874V5.21265C1.5 3.99072 2.49072 3 3.71265 3H14.2874ZM2.625 12.7874C2.625 13.388 3.11204 13.875 3.71265 13.875H14.2874C14.888 13.875 15.375 13.388 15.375 12.7874V5.56201L9.65845 8.86304C9.45897 8.97821 9.23253 9.03879 9.0022 9.03882C8.77185 9.03882 8.54545 8.97819 8.34595 8.86304L8.34375 8.86157L2.625 5.52539V12.7874ZM3.71265 4.125C3.42315 4.125 3.16048 4.23861 2.96558 4.4231L8.90845 7.88892L8.95386 7.90723C8.96954 7.91141 8.98582 7.91382 9.0022 7.91382C9.03505 7.91379 9.0675 7.90533 9.09595 7.88892L15.0586 4.4458C14.8616 4.24767 14.5888 4.125 14.2874 4.125H3.71265Z" fill="#777777"/>
  </svg>
)

// 전화 ic_phone — 14×14
const PhoneIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path fillRule="evenodd" clipRule="evenodd" d="M4.13654 1.16756C4.50655 1.16717 4.86734 1.2828 5.16762 1.4991C5.46808 1.71561 5.69273 2.02155 5.80963 2.37297L6.36277 4.0341C6.44133 4.26754 6.45347 4.51846 6.39695 4.75814C6.34039 4.99789 6.21783 5.21736 6.04319 5.39103L6.04262 5.39046L5.90932 5.5249C5.88775 5.54649 5.8637 5.5658 5.83812 5.58244C5.74031 5.64607 5.66988 5.74462 5.64158 5.85815C5.61389 5.96953 5.62911 6.08698 5.68317 6.18799C6.24233 7.04912 6.9797 7.78006 7.84503 8.33219C7.91586 8.37538 7.99913 8.39369 8.08144 8.38403C8.16409 8.37426 8.24114 8.33708 8.30019 8.27808L8.61351 7.96362C8.78686 7.78927 9.00559 7.66705 9.24469 7.61043C9.48415 7.55379 9.73495 7.56508 9.96816 7.64347L11.6264 8.19718C11.9775 8.31456 12.2828 8.53991 12.4992 8.84033C12.7154 9.14066 12.8322 9.50125 12.8324 9.87142V11.5867C12.8324 11.9156 12.7023 12.2315 12.4707 12.4651C12.2391 12.6986 11.9246 12.8311 11.5957 12.8337H11.5364C11.5216 12.8337 11.5068 12.8329 11.492 12.8314C8.84973 12.5598 6.38117 11.3863 4.50169 9.50798C2.62223 7.62965 1.44601 5.16095 1.17088 2.51709C1.17057 2.5141 1.17056 2.51097 1.17031 2.50798C1.14304 2.18031 1.24645 1.85506 1.45856 1.60392C1.67069 1.35279 1.97411 1.19638 2.30166 1.1687C2.31386 1.16767 2.32644 1.16699 2.33869 1.16699L4.13654 1.16756ZM2.36603 2.04199C2.27338 2.05223 2.1878 2.09698 2.12734 2.16846C2.06559 2.24157 2.03494 2.33622 2.04189 2.43164C2.29723 4.87384 3.38424 7.15369 5.12034 8.88875C6.85298 10.6203 9.12677 11.7039 11.5615 11.9587H11.5888C11.6867 11.9579 11.7807 11.9184 11.8498 11.8487C11.9187 11.7791 11.9574 11.6849 11.9574 11.5867V9.87199L11.9546 9.80249C11.9418 9.64027 11.8849 9.48403 11.7894 9.35132C11.6802 9.19977 11.526 9.08634 11.349 9.02718L9.69017 8.47347L9.68903 8.4729C9.6108 8.4467 9.52659 8.44254 9.44635 8.46151C9.36587 8.48055 9.29215 8.52193 9.23387 8.58057L9.2333 8.58114L8.91998 8.89616L8.91941 8.89673C8.72126 9.09497 8.46189 9.2206 8.18341 9.25334C7.90495 9.28603 7.62347 9.22373 7.38475 9.07674L7.37905 9.07332C6.39899 8.44896 5.56512 7.61951 4.9352 6.64258C4.92995 6.63442 4.92509 6.626 4.92039 6.61751C4.75666 6.32159 4.711 5.97442 4.79279 5.64624C4.86969 5.33782 5.05443 5.06851 5.31175 4.88403L5.42511 4.77124L5.42568 4.7701C5.48447 4.71164 5.52625 4.63782 5.54531 4.55705C5.5643 4.47631 5.56035 4.39178 5.53392 4.31323L5.53335 4.31209L4.97964 2.64925C4.92075 2.47212 4.80731 2.31789 4.65607 2.2089C4.50491 2.10007 4.32326 2.04172 4.13711 2.04199H2.36603Z" fill="#989898"/>
  </svg>
)

// 휴대폰 ic_cellphone — 14×14
const MobileIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path d="M7.00065 10.2087C7.32282 10.2087 7.58398 10.4698 7.58398 10.792C7.58398 11.1142 7.32282 11.3753 7.00065 11.3753C6.67848 11.3753 6.41732 11.1142 6.41732 10.792C6.41732 10.4698 6.67848 10.2087 7.00065 10.2087Z" fill="#989898"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M9.94637 1.16699C10.8968 1.16699 11.6673 1.93755 11.6673 2.88794V11.1127C11.6673 12.0631 10.8968 12.8337 9.94637 12.8337H4.05493C3.10454 12.8337 2.33398 12.0631 2.33398 11.1127V2.88794C2.33398 1.93755 3.10454 1.16699 4.05493 1.16699H9.94637ZM3.20898 11.1127C3.20898 11.5799 3.58779 11.9587 4.05493 11.9587H9.94637C10.4135 11.9587 10.7923 11.5799 10.7923 11.1127V4.32747H3.20898V11.1127ZM4.05493 2.04199C3.58779 2.04199 3.20898 2.4208 3.20898 2.88794V3.45247H10.7923V2.88794C10.7923 2.4208 10.4135 2.04199 9.94637 2.04199H4.05493Z" fill="#989898"/>
  </svg>
)

// 이메일 ic_mail — 14×14
const EmailIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path fillRule="evenodd" clipRule="evenodd" d="M11.1117 2.33301C12.0621 2.33301 12.8327 3.10356 12.8327 4.05396V9.94539C12.8327 10.8958 12.0621 11.6663 11.1117 11.6663H2.88696C1.93657 11.6663 1.16602 10.8958 1.16602 9.94539V4.05396C1.16602 3.10356 1.93657 2.33301 2.88696 2.33301H11.1117ZM2.04102 9.94539C2.04102 10.4125 2.41982 10.7913 2.88696 10.7913H11.1117C11.5789 10.7913 11.9577 10.4125 11.9577 9.94539V4.32568L7.51148 6.89315C7.35632 6.98273 7.1802 7.02984 7.00106 7.02987C6.8219 7.02987 6.64581 6.98271 6.49064 6.89315L6.48893 6.89201L2.04102 4.2972V9.94539ZM2.88696 3.20801C2.6618 3.20801 2.4575 3.29637 2.30591 3.43986L6.92814 6.1355L6.96346 6.14974C6.97566 6.15299 6.98832 6.15487 7.00106 6.15487C7.02661 6.15484 7.05185 6.14827 7.07398 6.1355L11.7116 3.45752C11.5584 3.30342 11.3462 3.20801 11.1117 3.20801H2.88696Z" fill="#989898"/>
  </svg>
)

// ─── Types ────────────────────────────────────────────────────────────────────

export type ProfileCardVariant = 'default' | 'large'

export interface ProfileCardProps {
  name: string
  title?: string
  department?: string
  avatar?: string
  badge?: string
  phone?: string
  mobile?: string
  email?: string
  variant?: ProfileCardVariant
  className?: string
  onMessage?: () => void
  onChat?: () => void
  onEmail?: () => void
}

// ─── Avatar image ─────────────────────────────────────────────────────────────

const AvatarImage: React.FC<{ src?: string; name: string; size: number; radius: number }> = ({
  src, name, size, radius,
}) => {
  const [err, setErr] = useState(false)
  // 사람 이미지 플레이스홀더
  const placeholder = `https://i.pravatar.cc/${size}?img=12`
  const imgSrc = src && !err ? src : placeholder

  return (
    <div
      style={{ width: size, height: size, borderRadius: radius }}
      className="overflow-hidden flex-shrink-0 border border-black/[0.06]"
    >
      <img
        src={imgSrc}
        alt={name}
        className="w-full h-full object-cover"
        onError={() => setErr(true)}
      />
    </div>
  )
}

// ─── Contact row ──────────────────────────────────────────────────────────────

const ContactRow: React.FC<{ icon: React.ReactNode; text: string }> = ({ icon, text }) => (
  <div className="flex items-center gap-2 h-7">
    <span className="flex-shrink-0 flex items-center">{icon}</span>
    <span className="text-body5 font-regular text-secondary-800 truncate">{text}</span>
  </div>
)

// ─── Component ────────────────────────────────────────────────────────────────

export const ProfileCard: React.FC<ProfileCardProps> = ({
  name,
  title,
  department,
  avatar,
  badge,
  phone,
  mobile,
  email,
  variant = 'default',
  className = '',
  onMessage,
  onChat,
  onEmail,
}) => {
  const displayName = title ? `${name} ${title}` : name

  if (variant === 'large') {
    return (
      <div
        className={[
          'bg-white border border-secondary-100 rounded-[16px] w-[234px] overflow-hidden',
          className,
        ].join(' ')}
      >
        {/* 대형 아바타 202×202, r:14 — Figma: 카드 234px, 이미지 202px → 좌우 16px 여백으로 중앙 */}
        <div className="flex justify-center pt-4 px-4">
          <AvatarImage src={avatar} name={name} size={202} radius={14} />
        </div>

        <div className="px-4 pt-3 pb-4">
          {/* 이름 + 뱃지 */}
          <div className="flex items-center gap-1.5 flex-wrap mb-1">
            <span className="text-body3 font-medium text-secondary-800">{displayName}</span>
            {badge && (
              <span className="inline-flex items-center h-5 px-1.5 rounded bg-secondary-50 text-[11px] font-medium text-secondary-600 flex-shrink-0">
                {badge}
              </span>
            )}
          </div>
          {/* 부서 */}
          {department && (
            <p className="text-body6 font-regular text-secondary-600 mb-3 leading-relaxed">{department}</p>
          )}

          {/* 액션 버튼 — 쪽지 / 1:1대화 / 메일 */}
          {(onMessage || onChat || onEmail) && (
            <div className="flex mb-3" style={{ gap: 2 }}>
              {onMessage && (
                <button type="button" onClick={onMessage}
                  className="inline-flex items-center gap-1 h-7 px-2 rounded-md border border-secondary-400 bg-white text-body5 font-regular text-secondary-800 hover:bg-secondary-50 transition-colors">
                  쪽지
                </button>
              )}
              {onChat && (
                <button type="button" onClick={onChat}
                  className="inline-flex items-center gap-1 h-7 px-2 rounded-md border border-secondary-400 bg-white text-body5 font-regular text-secondary-800 hover:bg-secondary-50 transition-colors">
                  1:1대화
                </button>
              )}
              {onEmail && (
                <button type="button" onClick={onEmail}
                  className="inline-flex items-center gap-1 h-7 px-2 rounded-md border border-secondary-400 bg-white text-body5 font-regular text-secondary-800 hover:bg-secondary-50 transition-colors">
                  메일
                </button>
              )}
            </div>
          )}

          {/* 연락처 */}
          {phone  && <ContactRow icon={<PhoneIcon />}  text={phone} />}
          {mobile && <ContactRow icon={<MobileIcon />} text={mobile} />}
          {email  && <ContactRow icon={<EmailIcon />}  text={email} />}
        </div>
      </div>
    )
  }

  // Default variant — 234×220
  return (
    <div
      className={[
        'bg-white border border-secondary-100 rounded-xl p-4 w-[234px]',
        className,
      ].join(' ')}
    >
      {/* 상단: 아바타(32×32 r:12) + 액션 아이콘 */}
      <div className="flex items-start justify-between mb-2">
        {/* 아바타 32×32, r:12, 온라인 도트 */}
        <div className="relative flex-shrink-0">
          <AvatarImage src={avatar} name={name} size={32} radius={12} />
          {/* 온라인 dot — #6CD3FF, r:3.25 */}
          <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[#6CD3FF] border-[1.5px] border-white" />
        </div>

        {/* 액션 아이콘 버튼 (24×24, r:4) */}
        <div className="flex items-center gap-0.5">
          {onMessage && (
            <button type="button" onClick={onMessage}
              className="w-6 h-6 flex items-center justify-center rounded hover:bg-neutral-30 transition-colors" aria-label="쪽지">
              <MsgIcon />
            </button>
          )}
          {onChat && (
            <button type="button" onClick={onChat}
              className="w-6 h-6 flex items-center justify-center rounded hover:bg-neutral-30 transition-colors" aria-label="1:1대화">
              <ChatIcon />
            </button>
          )}
          {onEmail && (
            <button type="button" onClick={onEmail}
              className="w-6 h-6 flex items-center justify-center rounded hover:bg-neutral-30 transition-colors" aria-label="메일">
              <MailIcon />
            </button>
          )}
        </div>
      </div>

      {/* 이름 + 뱃지 */}
      <div className="flex items-center gap-1.5 flex-wrap mb-0.5">
        <span className="text-body5 font-medium text-secondary-800">{displayName}</span>
        {badge && (
          <span className="inline-flex items-center h-5 px-1.5 rounded bg-secondary-50 text-[11px] font-medium text-secondary-600 flex-shrink-0">
            {badge}
          </span>
        )}
      </div>

      {/* 부서 */}
      {department && (
        <p className="text-body6 font-regular text-secondary-600 mb-2 leading-relaxed">{department}</p>
      )}

      {/* 연락처 divider — #e1e1e1, 1px */}
      {(phone || mobile || email) && (
        <div className="w-full border-t border-[#e1e1e1] mb-1" />
      )}

      {/* 연락처 */}
      {phone  && <ContactRow icon={<PhoneIcon />}  text={phone} />}
      {mobile && <ContactRow icon={<MobileIcon />} text={mobile} />}
      {email  && <ContactRow icon={<EmailIcon />}  text={email} />}
    </div>
  )
}

export default ProfileCard
