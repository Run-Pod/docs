import React, { useLayoutEffect } from "react";
import Link from "@docusaurus/Link";
import useBaseUrl from "@docusaurus/useBaseUrl";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { useThemeConfig } from "@docusaurus/theme-common";
import ThemedImage from "@theme/ThemedImage";
function LogoThemedImage({ logo, alt, imageClassName }) {
  const sources = {
    light: useBaseUrl(logo.src),
    dark: useBaseUrl(logo.srcDark || logo.src),
  };
  const themedImage = (
    <ThemedImage
      className={logo.className}
      sources={sources}
      height={logo.height}
      width={logo.width}
      alt={alt}
      style={logo.style}
    />
  );
  // Is this extra div really necessary?
  // introduced in https://github.com/facebook/docusaurus/pull/5666
  return imageClassName ? (
    <div className={imageClassName}>{themedImage}</div>
  ) : (
    themedImage
  );
}

export default function Logo(props) {
  const {
    siteConfig: { title },
  } = useDocusaurusContext();
  const {
    navbar: { title: navbarTitle, logo },
  } = useThemeConfig();
  const { imageClassName, titleClassName, ...propsRest } = props;
  // If visible title is shown, fallback alt text should be
  // an empty string to mark the logo as decorative.
  const fallbackAlt = navbarTitle ? "" : title;
  // Use logo alt text if provided (including empty string),
  // and provide a sensible fallback otherwise.
  const alt = logo?.alt ?? fallbackAlt;

  const [logoLink, setLogoLink] = React.useState(logo?.href || "/");
  useLayoutEffect(() => {
    setLogoLink(window.location.origin);
  }, []);

  return (
    <>
      {logo && (
        <Link
          to={logoLink}
          {...propsRest}
          {...(logo?.target && { target: logo.target })}
        >
          <LogoThemedImage
            logo={logo}
            alt={alt}
            imageClassName={imageClassName}
          />
        </Link>
      )}
      <Link to={"/"} {...propsRest} target="_self">
        {navbarTitle != null && <b className={titleClassName}>{navbarTitle}</b>}
      </Link>
    </>
  );
}
