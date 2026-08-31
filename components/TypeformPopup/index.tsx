import { Icon } from '@iconify/react';
import { BUDGET_TYPEFORM_ID, TYPEFORM_ID } from '@/constants/common.constants';
import ICONS from '@/constants/icons.constants';
import { PopupButton } from '@typeform/embed-react';
import { useTranslations } from 'next-intl';
import React from 'react';

type TypeformIntent = 'consultation' | 'message' | 'quote';

type Props = {
  intent: TypeformIntent;
  fullWidth?: boolean;
};

const INTENT_CONFIG = {
  consultation: {
    id: TYPEFORM_ID,
    label: 'schedule',
    icon: ICONS.calendar,
  },
  message: {
    id: TYPEFORM_ID,
    label: 'send_message',
    icon: ICONS.message,
  },
  quote: {
    id: BUDGET_TYPEFORM_ID,
    label: 'request_quote',
    icon: ICONS.budget,
  },
} as const;

/** Renders the same look as Button.Text but as a span, so PopupButton (a <button>) has no nested button. */
const TypeformPopupButton = ({ intent, fullWidth = false }: Props) => {
  const t = useTranslations('buttons');
  const { id, label, icon } = INTENT_CONFIG[intent];

  return (
    <PopupButton id={id} size={70} className={fullWidth ? 'w-full' : undefined}>
      <span
        className={`group relative inline-flex overflow-hidden rounded-full p-[1px] transition-shadow duration-300 hover:shadow-[0_0_24px_-4px_rgba(255,86,205,0.45)] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 ${fullWidth ? 'w-full' : ''}`}
      >
        <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#0000_0%,#ff56cd_60%,#0000_100%)]" />
        <span
          className={`inline-flex cursor-pointer items-center justify-center gap-3 rounded-full border border-white/10 bg-neutral-950/60 p-3 px-5 font-light text-white shadow-[inset_0_1px_0_0_rgba(255,255,255,0.12)] backdrop-blur-xl ${fullWidth ? 'w-full' : ''}`}
          style={{ fontFamily: 'var(--font-jost)' }}
        >
          {icon && <Icon icon={icon} />}
          {t(label)}
        </span>
      </span>
    </PopupButton>
  );
};

/** Renders the same look as Button.Minimal but as a span, so PopupButton (a <button>) has no nested button. */
const TypeformPopupMinimal = ({ intent, fullWidth = false }: Props) => {
  const t = useTranslations('buttons');
  const { id, label, icon } = INTENT_CONFIG[intent];

  return (
    <PopupButton id={id} size={70} className={fullWidth ? 'w-full' : undefined}>
      <span
        className={`group relative inline-flex overflow-hidden rounded-full border border-gray-400/60 bg-white/5 px-5 py-3 backdrop-blur-md transition-[transform,box-shadow,border-color] duration-300 hover:scale-[1.03] hover:border-[#ff56cd]/50 hover:shadow-[0_0_24px_-4px_rgba(255,86,205,0.45)] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 ${fullWidth ? 'w-full justify-center' : ''}`}
        style={{
          transitionTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        }}
      >
        <span className="absolute inset-0 translate-y-full rounded-full bg-white/10 transition-transform duration-500 ease-out group-hover:translate-y-0" />
        <span
          className="relative z-10 inline-flex cursor-pointer items-center justify-center gap-3 font-light text-white"
          style={{ fontFamily: 'var(--font-jost)' }}
        >
          {icon && <Icon icon={icon} />}
          {t(label)}
        </span>
      </span>
    </PopupButton>
  );
};

const TypeformPopup = {
  Button: TypeformPopupButton,
  Minimal: TypeformPopupMinimal,
};

export default TypeformPopup;
