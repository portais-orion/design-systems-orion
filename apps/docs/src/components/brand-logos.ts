import type { StaticImageData } from "next/image";
import auroraLogo from "../../../../assets/aurora-logo.png";
import orionLogo from "../../../../assets/orion-logo.png";
import supertransLogo from "../../../../assets/supertrans-logo.png";

/*
 * Logos de marca — fonte única em /assets, chaveadas pelo brand id de
 * brands.json. O import estático deixa o bundler resolver dimensões e
 * otimização. Marca nova: adicionar /assets/<id>-logo.png e uma linha aqui.
 */
export const brandLogos: Record<string, StaticImageData> = {
  aurora: auroraLogo,
  orion: orionLogo,
  supertrans: supertransLogo,
};
