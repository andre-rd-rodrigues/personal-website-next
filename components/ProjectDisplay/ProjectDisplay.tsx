import ImageZoomEffect from '@/components/ImageZoomEffect/ImageZoomEffect';
import React, { useState } from 'react';
import styles from './projectdisplay.module.scss';
import Hotjar from '@hotjar/browser';

import ICONS from '@/constants/icons.constants';
import { Icon } from '@iconify/react';
import { useTranslations } from 'next-intl';
import Button from '../Button';
import Modal from '../Modal';

interface ProjectDisplayProps {
  imgSrc: string;
  video?: string;
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
  video,
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

    Hotjar.event(`Project opened: ${label}`);
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
          <div className="col-span-2 flex h-full items-center justify-center md:col-span-1">
            <video
              className="h-full rounded-lg"
              autoPlay
              muted
              loop
              playsInline
            >
              <source
                src={video || '/animations/liquid.webm'}
                type="video/webm"
              />
            </video>
          </div>
          <div className="col-span-2 flex h-full flex-col justify-between md:col-span-1">
            <div>
              <h4 className="mb-5 inline-block text-4xl font-light sm:mb-7 sm:text-5xl">
                {label} <hr className="w-full border-[#ff56cd]" />
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
                    Hotjar.event(
                      `project_link_clicked_${label}_${app ? 'app' : 'website'}`,
                    )
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
