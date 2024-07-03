import React, { useState } from "react";
import ImageZoomEffect from "@/components/ImageZoomEffect/ImageZoomEffect";
import styles from "./projectdisplay.module.scss";
import { Modal, ModalBody, ModalFooter } from "react-bootstrap";
import { Icon } from "@iconify/react/dist/iconify.js";
import Image from "next/image";
import { useTranslations } from "next-intl";
import ReactGA from "react-ga4";
import { EventActions, EventCategories } from "@/constants/analytics.constants";

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
    github: string;
  };
}

const ProjectDisplay: React.FC<ProjectDisplayProps> = ({
  imgSrc,
  label,
  description,
  techStack,
  href,
  logo
}) => {
  const t = useTranslations();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { github, website, app } = href;

  const handleOpenProjectModal = () => {
    setIsModalOpen((prevState) => !prevState);

    ReactGA.event({
      category: EventCategories.USER_INTERACTION,
      action: EventActions.OPEN_PROJECT_DETAILS_MODAL,
      label
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
      <Modal
        show={isModalOpen}
        onHide={() => setIsModalOpen(false)}
        className="text-white"
        centered
        size="lg"
      >
        <div
          className="flex justify-end bg-dark p-3 cursor-pointer hover:text-custom-yellow"
          onClick={() => setIsModalOpen(false)}
        >
          <Icon icon="material-symbols-light:close" fontSize={22} />
        </div>
        <ModalBody className="bg-dark px-10">
          {logo && (
            <Image
              src={logo}
              alt={`${label} Logo`}
              width={50}
              height={30}
              className="m-auto"
              priority
            />
          )}

          <h4 className="text-center text-5xl mt-3 mb-8">{label}</h4>
          <p>{t(description)}</p>
          <hr className="my-7" />
          <p className="font-medium text-xl mb-4 flex gap-2">
            <Icon icon="radix-icons:stack" className="mt-1" />
            Tech Stack
          </p>
          <ul className="font-light">
            <li className="mr-4 mb-2">
              <span className="font-medium">Frontend:</span>{" "}
              {techStack.frontend.join(", ")}
            </li>
            {techStack?.backend && (
              <li className="mr-4 mb-2">
                <span className="font-medium">Backend:</span>{" "}
                {techStack?.backend.join(", ")}
              </li>
            )}
            {techStack?.database && (
              <li className="mr-4 mb-2">
                <span className="font-medium">Database:</span>{" "}
                {techStack?.database.join(", ")}
              </li>
            )}
          </ul>
        </ModalBody>
        <ModalFooter className="bg-dark">
          <a
            onClick={() =>
              ReactGA.event({
                category: EventCategories.USER_INTERACTION,
                action: EventActions.OPEN_PROJECT_GITHUB,
                label
              })
            }
            href={github}
            target="_blank"
            rel="noreferrer"
            className="hover:text-custom-yellow transition-all duration-100 ease-in"
          >
            <Icon icon="mdi:github" fontSize={25} className="mr-5" />
          </a>

          {(website || app) && (
            <a
              onClick={() =>
                ReactGA.event({
                  category: EventCategories.USER_INTERACTION,
                  action: app
                    ? EventActions.OPEN_PROJECT_APP
                    : EventActions.OPEN_PROJECT_WEBSITE,
                  label
                })
              }
              href={website || app}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1 font-normal hover:text-custom-yellow transition-all duration-100 ease-in"
            >
              {website ? "Website" : "App"}
              <Icon icon="majesticons:open" />
            </a>
          )}
        </ModalFooter>
      </Modal>
    </>
  );
};

export default ProjectDisplay;
