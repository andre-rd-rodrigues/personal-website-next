import { TYPEFORM_ID } from '@/constants/common.constants';
import ICONS from '@/constants/icons.constants';
import { PopupButton } from '@typeform/embed-react';
import { useTranslations } from 'next-intl';
import React from 'react';
import Button from '../Button';

type Props = {
  label?: string;
  icon?: (typeof ICONS)[keyof typeof ICONS];
};

const TypeformPopup = ({
  label = 'send_message',
  icon = ICONS.message,
}: Props) => {
  const t = useTranslations('buttons');

  return (
    <PopupButton id={TYPEFORM_ID} size={70}>
      <Button.Text icon={icon} label={t(label)} />
    </PopupButton>
  );
};

export default TypeformPopup;
