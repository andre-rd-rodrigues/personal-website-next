import React, { useState } from "react";
import ImageZoomEffect from "@/components/ImageZoomEffect/ImageZoomEffect";
import styles from "./projectdisplay.module.scss";
import { Modal, ModalBody, ModalFooter } from "react-bootstrap";
import { Icon } from "@iconify/react/dist/iconify.js";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { track } from "@vercel/analytics";

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
  const locale = useLocale();

  const { github, website, app } = href;

  const handleOpenProjectModal = () => {
    setIsModalOpen((prevState) => !prevState);

    track("Project clicked", {
      project: label,
      locale
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
              track("Project github clicked", {
                project: label,
                locale
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
                track("Project opened", {
                  project: label,
                  locale
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
