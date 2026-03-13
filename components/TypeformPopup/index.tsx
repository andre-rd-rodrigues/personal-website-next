import { Icon } from '@iconify/react';
import { TYPEFORM_ID } from '@/constants/common.constants';
import ICONS from '@/constants/icons.constants';
import { PopupButton } from '@typeform/embed-react';
import { useTranslations } from 'next-intl';
import React from 'react';

type Props = {
  label?: string;
  icon?: (typeof ICONS)[keyof typeof ICONS];
};

/** Renders the same look as Button.Text but as a span, so PopupButton (a <button>) has no nested button. */
const TypeformPopupButton = ({
  label = 'send_message',
  icon = ICONS.message,
}: Props) => {
  const t = useTranslations('buttons');

  return (
    <PopupButton id={TYPEFORM_ID} size={70}>
      <span className="relative inline-flex overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
        <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#0000_0%,#ff56cd_60%,#0000_100%)]" />
        <span
          className="inline-flex cursor-pointer items-center justify-center gap-3 rounded-full bg-neutral-950 p-3 px-5 font-light text-white backdrop-blur-3xl"
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
const TypeformPopupMinimal = ({
  label = 'send_message',
  icon = ICONS.message,
}: Props) => {
  const t = useTranslations('buttons');

  return (
    <PopupButton id={TYPEFORM_ID} size={70}>
      <span
        className="group relative inline-flex overflow-hidden rounded-full border border-gray-400 px-5 py-3 transition-transform duration-300 hover:scale-[1.03] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
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
