import ImageZoomEffect from '@/components/ImageZoomEffect/ImageZoomEffect';
import React, { useState } from 'react';
import styles from './projectdisplay.module.scss';

import { EventActions, EventCategories } from '@/constants/analytics.constants';
import ICONS from '@/constants/icons.constants';
import { Icon } from '@iconify/react/dist/iconify.js';
import { useTranslations } from 'next-intl';
import ReactGA from 'react-ga4';
import Button from '../Button';
import Modal from '../Modal';

interface ProjectDisplayProps {
  imgSrc: string;
  logo?: string;
  label: string;
  description: string;
  techStack: {
    frontend: string[];
    backend?: string[];
    database?: string[];
  };
  href: {
    app?: string;
    website?: string;
    github?: string;
  };
}

const ProjectDisplay: React.FC<ProjectDisplayProps> = ({
  imgSrc,
  label,
  description,
  techStack,
  href,
}) => {
  const t = useTranslations('projects');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { github, website, app } = href;

  const handleOpenProjectModal = () => {
    setIsModalOpen((prevState) => !prevState);

    ReactGA.event({
      category: EventCategories.USER_INTERACTION,
      action: EventActions.OPEN_PROJECT_DETAILS_MODAL,
      label,
    });
  };

  return (
    <>
      <div className={styles.container} onClick={handleOpenProjectModal}>
        <ImageZoomEffect overlay height="100%" width="100%" src={imgSrc}>
          <h4>{label}</h4>
        </ImageZoomEffect>
      </div>

      {/* Modal */}
      <Modal onHide={() => setIsModalOpen(false)} show={isModalOpen}>
        <h4 className="mb-8 mt-3 bg-[linear-gradient(259deg,#2729ff_60%,#ff56cd_100%)] bg-clip-text text-5xl font-extralight text-transparent">
          {label}
        </h4>

        <p>{t(description)}</p>
        <hr className="my-7" />
        <p className="mb-4 flex gap-2 text-xl font-medium">
          <Icon icon="radix-icons:stack" className="mt-1" />
          Tech Stack
        </p>
        <ul className="font-light">
          <li className="mb-2 mr-4">
            <span className="font-medium">Frontend:</span>{' '}
            {techStack.frontend.join(', ')}
          </li>
          {techStack?.backend && (
            <li className="mb-2 mr-4">
              <span className="font-medium">Backend:</span>{' '}
              {techStack?.backend.join(', ')}
            </li>
          )}
          {techStack?.database && (
            <li className="mb-2 mr-4">
              <span className="font-medium">Database:</span>{' '}
              {techStack?.database.join(', ')}
            </li>
          )}
        </ul>
        <hr className="text-pink my-7" />
        <div className="flex items-end justify-end">
          {github && (
            <a
              style={{ transform: 'scale(0.8)' }}
              onClick={() =>
                ReactGA.event({
                  category: EventCategories.USER_INTERACTION,
                  action: EventActions.OPEN_PROJECT_GITHUB,
                  label,
                })
              }
              href={github}
              target="_blank"
              rel="noreferrer"
            >
              <Button.Icon icon={ICONS.git} />
            </a>
          )}
          {(website || app) && (
            <a
              style={{ transform: 'scale(0.8)' }}
              onClick={() =>
                ReactGA.event({
                  category: EventCategories.USER_INTERACTION,
                  action: app
                    ? EventActions.OPEN_PROJECT_APP
                    : EventActions.OPEN_PROJECT_WEBSITE,
                  label,
                })
              }
              href={website || app}
              target="_blank"
              rel="noreferrer"
              className="hover:text-custom-yellow flex items-center gap-1 font-normal transition-all duration-100 ease-in"
            >
              <Button.Icon icon={ICONS.open} />
            </a>
          )}
        </div>
      </Modal>
    </>
  );
};

export default ProjectDisplay;
