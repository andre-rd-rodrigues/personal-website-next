"use client";
import { useState } from "react";
/* import LanguageSelector from "components/LanguageSelector/LanguageSelector"; */
import { Nav, Navbar, Offcanvas } from "react-bootstrap";

import styles from "./appnavbar.module.scss";

import { Icon } from "@iconify/react/dist/iconify.js";
import { useTranslations } from "next-intl";
import LanguageSelector from "../LanguageSelector";
import Image from "next/image";
import { Link } from "@/navigation";
import useIsMobile from "@/hooks/useIsMobile";

const AppNavbar = () => {
  const [show, setShow] = useState(false);
  const isMobile = useIsMobile(991);

  const t = useTranslations("navbar");

  return (
    <Navbar expand="lg" fixed="top" className={styles.nav}>
      <Navbar.Brand as={Link} href="/">
        <div className={styles.logo}>
          <div id="personal_picture" className={styles.avatarWrapper}>
            <Image
              src="/images/profile_avatar.jpg"
              alt="Personal Picture"
              layout="fill"
              objectFit="cover"
              objectPosition="center center"
              className={styles.avatarImage}
            />
          </div>
          <h1>AR</h1>
          <p> {t("brand_label")}</p>
        </div>
      </Navbar.Brand>
      <Navbar.Toggle
        aria-controls="offcanvas-container"
        onClick={() => setShow(true)}
      >
        <Icon icon="material-symbols-light:menu" color="white" fontSize={35} />
      </Navbar.Toggle>

      <Navbar.Offcanvas
        className={`${styles.offcanvas} ${isMobile ? "offcanvas-custom" : ""}`}
        show={show}
        responsive="lg"
        onHide={() => setShow(false)}
        aria-labelledby="offcanvas-container"
        placement="end"
      >
        <Offcanvas.Header closeButton />
        <Offcanvas.Body>
          <Nav
            onSelect={() => setShow(false)}
            className={styles.offcanvasLinks}
          >
            <Nav.Link as={Link} href="/portfolio">
              {t("portfolio")}
            </Nav.Link>
            <Nav.Link as={Link} href="/portfolio/#testimonials">
              {t("testimonials")}
            </Nav.Link>

            <Nav.Link as={Link} href="/about">
              {t("about")}
            </Nav.Link>
            <Nav.Link as={Link} href="/skills">
              Skills
            </Nav.Link>

            <Nav.Link as={Link} href="/contacts">
              {t("contacts")}
            </Nav.Link>

            <Nav.Link href="https://www.blog.andrerodrigo.com">
              {t("blog")}
            </Nav.Link>

            <LanguageSelector />
          </Nav>
        </Offcanvas.Body>
      </Navbar.Offcanvas>
    </Navbar>
  );
};

export default AppNavbar;
