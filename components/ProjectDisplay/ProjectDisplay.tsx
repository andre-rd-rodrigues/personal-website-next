import ImageZoomEffect from '@/components/ImageZoomEffect/ImageZoomEffect';
import React, { useState } from 'react';
import styles from './projectdisplay.module.scss';

import { EventActions, EventCategories } from '@/constants/analytics.constants';
import ICONS from '@/constants/icons.constants';
import { Icon } from '@iconify/react';
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
  const [isTechStackOpen, setIsTechStackOpen] = useState(false);

  const toggleOpen = () => setIsTechStackOpen((prevState) => !prevState);

  const { website, app } = href;

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
        <div className="grid grid-cols-2 gap-10">
          <div className="col-span-1 flex h-full items-center justify-center">
            <video
              className="h-full rounded-lg"
              autoPlay
              muted
              loop
              playsInline
            >
              <source src="/animations/liquid.webm" type="video/webm" />
            </video>
          </div>
          <div className="col-span-1 flex h-full flex-col justify-between">
            <div>
              <h4 className="inline-block text-5xl font-light">
                {label} <hr className="mb-7 w-full border-[#ff56cd]" />
              </h4>
              <p>{t(description)}</p>
              {/* Tech Stack */}
              <div className="mt-5">
                <p
                  className="flex cursor-pointer items-center gap-2 text-xl font-light text-[#ff56cd]"
                  onClick={toggleOpen}
                >
                  <Icon
                    icon={ICONS.stack}
                    style={{
                      color: '#ff56cd',
                    }}
                  />
                  Tecnologies
                </p>
                <ul
                  className={`transition-height overflow-hidden font-light duration-500 ease-in-out ${isTechStackOpen ? 'mt-4 max-h-96' : 'max-h-0'}`}
                >
                  <li className="mb-2 mr-4">
                    <span className="font-normal">Frontend:</span>{' '}
                    {techStack.frontend.join(', ')}
                  </li>
                  {techStack?.backend && (
                    <li className="mb-2 mr-4">
                      <span className="font-normal">Backend:</span>{' '}
                      {techStack?.backend.join(', ')}
                    </li>
                  )}
                  {techStack?.database && (
                    <li className="mb-2 mr-4">
                      <span className="font-normal">Database:</span>{' '}
                      {techStack?.database.join(', ')}
                    </li>
                  )}
                </ul>
              </div>
            </div>

            <div className="flex items-end justify-end">
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
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ProjectDisplay;
