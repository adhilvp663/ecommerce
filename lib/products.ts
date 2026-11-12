import { type CatalogCategory } from "@/lib/constants";
import { roundTo90, slugify } from "@/lib/format";

export type ProductCategory = CatalogCategory | "accessory";

export type ColorOption = {
  id: string;
  name: string;
  hex: string;
};

export type ProductBadge = {
  label: string;
  tone: "solid" | "muted" | "gold";
};

export type Product = {
  slug: string;
  name: string;
  line: string;
  category: ProductCategory;
  description: string;
  price: number;
  compareAt?: number;
  image: string;
  gallery: string[];
  badge?: ProductBadge;
  rating: number;
  reviews: number;
  colors: ColorOption[];
  sizes: string[];
  meta?: string;
  releaseStatus: "ready" | "archival";
  arrival: number;
  featured: number;
  stock: number;
  story: string;
  catalog: boolean;
};

export const IMAGES = {
  logo: "https://lh3.googleusercontent.com/aida/ALJJyrB1NvSuwoRa63xNfxg9qT7QLrb5L8kpPTXOYW-2RAfiu8amOrhrrYLNw6AXg_0Fa1pTuh36nyT3_qxmMRYoztkEJ_fYlHnuSWAxbyoKzeK-qnPzeuGv9CJKdbe8kf68Q-0yZ2lcn-4Gc67eNf7Xd7iE4PEWR9Jm8GdK_agL0lqK9Ysp5lACQb5tAabn-DPF9kRR5pROh6GpsuAo1NL19ou_FC0a_v9vS2601fsaOY7L7Q",
  avatar:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDwsaGVsJab-M6b3sUiherqrF5y9cp_z8CxUpbIH3bdkSrw5nVg5EVsK9Hd5LKjdSAFwI6SUP7LhHGjRguHi0x36EDjWTAG3TQl30WoUSnqGUN-kQ4jIcTf6LaPnQefh6OnqzYbGHhOpe6BEjSVmSeEISRqAS_jFtmvVPn7nvenzIFNs96Lswvo9xFTCAp_8I7ouNV3pSH9-OymccNlGp6yI2uewEmTP-upgxPRSwJa",
  accountAvatar:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAzNFhKuF2Lel86lTs2np4A0AK5e1sHMoE3AhR3QNIzuNZqZmCeJtg90mNUSwstAWkzR0Kb6yHvnYC6uMsYtlcNQ5gxCsVDToGMJz7-wo0tjVDxAJdXBhnzsffDsgyIc3w2NqGP6UtnI7ypEXrJLg2xIolDJnUfYXJwRL-uAKcgPXmsJ7OD0wqEN5ff5uqc18B0Etmd_peGVE3-FlR4mS1VMOlKuEp6UXZP3OsyWGFE",
  hero: "https://lh3.googleusercontent.com/aida-public/AB6AXuAPJQJrzEMQrP1s-McC75Hoa5itEtB7LQ69mBhaafHVM84MEjElnWFkGV1eAsUXo3B_DMpBzFHiJ88YWyQciskX5aOG2nLw0PggRe6n7RTmiiG2pHKec-BsubkhuWvQU-Htuu098RqOisgvE8cPaXG2OPAkQI1S1zc4egf6APdg-IAup4RY8lKyxJ2XTBjhYjtn0D28cXRgRrFdZQORJT_-VB72FF054yFGVcZZBLrA",
  apex: "https://lh3.googleusercontent.com/aida-public/AB6AXuBLUgp4BReUFzpce9-O3CChbe6ny3zXNrvw7tUc4tYg8DlhEmFFnMc-mRrohmTMBZJL8s-vkSgljGkd8v0IX4Gd2VOjO9Z-Dasj8vfrT4Txr9r1HW5RgUJiJYuyFNadndYl4Qfg5dDB9KbJarD4OvHUPTsqLfvaESRRBbPsO7e4e4GwiMh98pe_mxK_4mglpeHGoemywv6XQpKXMiNT5CpIi4Z_wrlrH7xRg0eEfqyr",
  derby:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDXdREaElO-htHn-cODL1ZNRaRqQvhD48GvidpVtJ3yS0CPBHvAPlIzbEF1AzxfVmrRPMgw9VwFt9JEACrOnPjEYx9znoCm2m-MYUYaivaRsMNqN-UU4iAIelmxEGEq_Pg3XVrp6SmSQa9F-WyaPacMt-RDiAWim37a6xg9tuNnpfCcbYafOgXxQL8nGIXZ0HNAx_D1kcHtpUzvNUkjGH2Xg3m1n9o8UA1xJxnLuzZ3",
  monoSlip:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDIxAWLiTAcPZP6tmDWUEy3idIfhbprHRAgQXckB01QmzRNGFHlDAKI-IY19W_zcH7pGt6wXFOPRbEQnjHSCpkQhBLM2VCKBp6cKr6qJ5YFzFIl1IKWvp8-hgaH4odYzuQ2DeCkhMyTJEzG-EFCLZNLo68IVZpUu3lpmJxbuI2YHc-pTXkIYGlBfUwJd0ALf93p9zeMkzoNjBRPlgC7tkFjbKRIBMANSc5AiEjm-qmD",
  hyperpulse:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBqQ3Weebx1Ir9xTVYqyVkmUopQBQTR4pn0ii9IxyFMEHtC2Cyo5LJvKeBihPktLbTLQ0Z3aiF0WdOuGeks2hk7waPMKttW15EQg_3ikvi02wJyLIbg-y5swPu6pSNrwPllJkUlQVWqpz0uvX7k5nYd37LSBJhU0EQuJk3MEdWx4M_GhtFuJLyFflcBgrVfv9sPSm8fq2FpIpG66Ur0Lj6K_YmxvlzAnj1AnTR8jSha",
  retro:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCJBx5KCFFV33j1843ELKveHXpFOKr1D1uXS_Opt9TxIVQZVktaw8eS6fRjCMKqUKMpKAWVM7Xh3vDvtfLKfGt3RRoPJUvw-aQ2SdEHanoYjTBZcfA_2YsDeVTF-3Kr7Ex52oBJDV55z2LvdJ1mgn0Rp4NSNHH71Uao1KUP_vLMdJbiVhSZIQ0lyVtDSHSiwYlgH0X5lIZ4tNWVk05JTQkBmih1gdkfl7kWowJlFm_w",
  chelsea:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDhtvFFqZ-qnqPz_C8HstixFB0VG_UYegWD7VDpq-pUBem6I5RsiUKsds4Ba977Ukwt01z6kPw0mZ1LmnHtna8VsSS42zrJrcA41VHsCNHCHff_XCq44g67HNNfzysTzqVELGwEJjmZHfAhhr4QOyOI5l9hiKSR_tK6vipKBBHeOWYytb2tL-TNpxmWjrnqbU5YpJ2bmMgKw1KdG1l8k8VOlQlidqoLXtZ6sb7sIfag",
  aeroform:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuB3AxoaYsQWf2l1stU9N5B4rezMB834I732-GU3XVFMz0XH1XrNq6NScAvbERFlff_xDbzFo9ICq6pMBQtf3vmOS6tUtfS06guOhVNOwGHkUoEmQvAnNK8OzBsTIGMVBy4phRxEhtLwucIWhnkb-FkVUOtLuG6CpqNJYHEIvs7bD81XGv-jcXVJSnPi30uMSo7N2jO9YIHw9rEaqvY8caWdmUzgSOqTYusT_2XUzaaW",
  venetian:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuB4uMqiHAlFetakvUFdc6nlIbRiXEktkDI3Z2SPlXTZTklRkJGDLOSTljDvgb7EqjxGNEgieHMDY5Ub_7jsFjAkOT8P6OyrSVJ7MdwT_frOAKHZNpq0QNt2Ln_E9bPbUcrcMjC06GvaahAghXAO4tSBCbC8FKymaCXkfSK4YBNM2iahe5aC7i5jasAB4ZLArpVZvRaPZKSfHNAJzSFaMQ5wdrDgjgxCEs82Yf6TSi3p",
  spectre:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuC5rxrHTRZpFvm6owk_XLxVdFdyZFJpoz0rgJmI82YtkKk-ifsTkapkWiw6-TJH_h0-lilTRkz6wsTJiW95WPK9A4MGejcwSxUXEqGZKSIqmfKlQ2UWrIxAVlUS4txVMVZ_1YTrTkp6FftSR3nF69Dd5slRPev7ui5XJyT3zY1BH9-csU9dzRtj8Y5fkZcC0_WJwdYTSHSzpdqwV4BcABoWhYKczHZ9dpSRdjjX6OcK",
  spectreSide:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBthP6Sh-M-fjLuWXJTi99Q7qoeft0KMmW8oO03Fj4EylNf0wjOOuv30DFO44XQSo95HSBOgBTDxyR4AZLO6W2oBod_fMfkOhyVVmBPA0hkCQrNQf7Yz3N5OtZT-SG9Q24Sm0RlTvJLuZWEgLL_8h4_5o71D08qdHedtiCWVhDSoNalPJswQx5ht_ucoQtfFUWZRRjcLQf3jCEq2ViCDIhYEE4RqCJY_f864zThsKy5",
  spectreTop:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAUZ-5mg2mQOjlp-igQz29S8sEDKHZVVo0qmCksIApBgGbeaAfI86Ca7iEDxHgSPMSBbfyWi-FdJlQqBPRYcTzOYFEp5XTxDKBCXylX018zdVeFbyzvBEyXEN-4DTN0EK1NTqtkzgtwKkO9Yj-P27Pq13lnkuRkmjbqglzMAayG6oqIG3yw53uyQkM2dMPU-6dsVLQngusiLLfCMteTYEiOzQkD7F4f3AtJ0WEODmoz",
  spectreHeel:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuC33LvNIr0qjqN4fJRlY--YsJmV7Sg5O9mHKORSP0o0fKHcvbmv0tWj9KzoC4v1mQjx8PvFk7-5UNlkvapb2_aAkd2AvF06cuCRnrPSRqowgjoHQtBDq1Kj6ffhVzRsIOAygVOY33lA2BE_siB3FK3ADvzIf8E9NUT1VYf5PAfnTk7YXrM6ZibmFy5mwo147IBvcxPuVl6WK-CIITST24RI-rKzJt4p7vwUHS--LIfV",
  spectreFoot:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBzgVNZS3xTOs_H2HdInKgQSiPX7Ef0QPsHaVIlo3CEiXGWrjE3o4bYaqNPjAnC8K_2uC6AdPn9GF-jyLIUe_o_KNb-DiENKIew2CB6PUBzQRFmYvsGnTbXzJpFUpA_2mDP4Wvzic1kWgRVJ55oj35oqewmR5tYtp3-OKdY--45V8b9OoSYT-qczD98d0WZDFgtbStE7_yi5-KLLU7KMrhOie0KfPNNoZg__JHo4RWl",
  aura: "https://lh3.googleusercontent.com/aida-public/AB6AXuB25R62eBks_ko3OSXNJSlZljPhOb75YTxLDT-LWwqFgUTmxgI_uvFmZwKTLejKydQCJMHzGrAatX09LiRGZieh_fbowkqBzFfieNTInOy73ydyAei2GKBcteiuGDoaV9KeRuYV1pgbEtVjmV_-1Sf8EQT3IvzSz26G5s3QO8hECY0nAIgXNxF79S79Y3IB4xtiHYt2n_FxJAs4BIS2J-82WnJKYbP0Ll5YiN4YyMp4",
  phantom:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDhoVBKeJolLdLCfW8sDEGia9w39re20X2qTGn8WxZfwYZ3-kDP8Gpy7s0JIB7G7G00mznDo-bendK7H56gb0qkKJgKKuThJSzL6At4x515Z-4K9PNx63jv3ptQNr10Gvh_b_3puI4AaOEC0guOXqSS4ZFpezu-bff6D1gXx7t7WkIlelgim29QMQE2CPLL-iai3TK1H1l5H9V77JzoP_TPQdY_KqJ2YTtb-quTRKJq",
  veloce:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAtPeUJAayV4cDssQuH48jaymsFvnmtFgQX2K25K8Ys1g1Xsq6cxgyO3bshNdtD8lJv3UAHY-ymy4iMAuW28iK4yRYlNHmtLRz5eWsJla5kbbqG-KgRW3G7-Ijv52epIh1nYZDs6ZGoT-TW-wls0HJZb9_MkbAeDlNaKR2iC4o3dFOX7AapHPVNuaJ0cGm4MyZqhNM0ryn0qDJVQrR6V82tG0pZdeCXXUUBGLX5d1x9",
  kuro: "https://lh3.googleusercontent.com/aida-public/AB6AXuDMNbAiTjvoNdjDDjGe3OyTIwBQm4fkAfCkRSDAUz50G6o1bQkhMBCix_J3w64MjKfruo8lwEAK_3L7AYqbZ1744V_19uGCfOusWgWkgGYI5c0NN7neYDL5wKE7r0TMHHb4GXbmWvfH2aXPGlKdJj5tDjKcnXmjGQVKHXMA_XDQwyvv0Gs9X1tDsdubvY6qRsVqCJm2fPMvCytRKJelciatUHZ3OCIN2CEQ4jvHwqll",
  vortex:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBBj_vr_S0tnAOhk-eW3xp7m0v_BfJTr64yyw_MDfqW0G0m-fTEn1pXt0G8CSt0ThRZHeJ-wgkqYLFZo9mQH3DWEd9dyzyMhF_AqNwy0aSwtDMSEj6l_qRQx1f8vgFkGD0t8FwJomA2NM1GkyICnUgrA8GKOSVsrJ9OHVh0bHPSWlXF9B1w429UvcnfQoCEsdwrU33awWPQz-BjvXljxdQxz3dnxBWvXrGpFvNdpJt1",
  aether:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBZHLDEqNVSRsMaLKovWu388V783H9vWTZ5f0Y4BlRq3ivtYxIUMOmLB0ECpM9o5T2goKACVEHpflphk7oZaM2uaCPuNWhuWw6LqRIJ8oqvXIxwcADy7Kh44xA0Rr4ehq_Z1H4OcrgVb6nItnMWAaQQsSZvOx_KI755cw6yNbGYfzWfi7Q8z72V-z2Kjp7kQ11sa12LrikypezPeXrGVJFMG4xubSaIdneTUohAwzWR",
  vanguard:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDzawU71vofkSSvugPm2663TlRpJVo8pXVjl069659xIWdniRWkj_ltqyBqhEzSNUCW5HoEpoV76n1IonPC8uoaXNPm8Pu-c1H0A4hMQX3NRXME2PPOhx73ObYeaGc2TzkXfm_rciTXDnEHodIYRlA4DWPpGhBzVLjkzYHMJLGv7EKAMwpd0UdTXil0UIw7eRF5FPXaPQ00Ln-9IAR8MzNOwlWzgUciun894mP9ugM5",
  derbyWedge:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBJJptEu32jMSuyOWVm_diQSGlfVW61LJJ69H3IwyFjx8D19tDo-3KXs5stOIXkAZldtEyN7KFn32RuKWQc7hgJLqvpVDXlqAr80e13bgrmDtklWAWNotVnRRa-mpfJUbw6gz-9NjNlapdBSTLupL7ZUGGr-1I7nCO0tDsE8nSZ4-FkT1sFMt3mTZ5gOH8HsT44qtGZgkc9CXpnVDJRwDGcAqFsoZ1gnm_NCUDYUYKv",
  careKit:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBOI-CjYo6mC0O7JbtnGuvWBrSUNg3NIdBn81vqx4VOEzSnVgy-WCsjpmP3VExuparppWPtRXUIcOQMqh622t4B0CO_HDFZnj6sTf-X3K4nGdSXxflhjDquvR2quhHLvjAOb-98Xyu_Qs99TCMUxqkipizlzuigOO1znLuQg3FfyWsrjcxXTU26TJKzxG4IC3rOrAKYtujv5iJREVtWLDRGtViXXRdtRFyQSXdnIW_6",
  spray:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCQK_93RuD6wEZRnJKzhMudwxet23w8zIKNLirC-LBNoN-fUkJYq0_33jADjOBaAeIyM_5ts_Re85xhcqIZE2LKlIZRi0VT4s-hCKyFiQZDKmBhPNHlKnPDdkMRBrZPfGYEtRzszW6TjkTc-6wjFB7ujUKMdyf0-F2FknZW511xrNSxr4ZC4CF5nIYeV2FDl4NuUB4Rd7ppcJZwq3YqPXxvVI-3yS-hRaZyXjenKeDf",
  socks:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBCKyg56rkrLgxvz5QrdFNjukyQZp7KqFLwRGjigfz46t6ov6OSfPeSMsibdjE6S2dBS-khYn7PFg_optHvm4jFTL85ylSiUUB-pnLV7dZKfYcxesNO4hP9JcnzqPlve4N8jDn4k1Cq7z7eogs-V4lEAql8c1ork5qpAucTj3c5BJHVLPHOv6zbIbvT1khV_AFe-RV-KkB5cJ98DNxIWmPDOEh5o5-vemfgFpD6uupx",
  shoeTrees:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCxXv7eEMB5H88FbE9GSgy0vacxeOSiOu3RdG47_ktGl9ErEObPxm4z3KHPE-ZqVhGOwoXfq9rWN0EL4Si1dAqLJw-E6ezBXwAWyt6DljAvIL5f-fFlSwjwFOCC9PXoJZYV6YP83I1heHMfvVaPIfCh2e2IrUCsjMQXx_orTCk_2tw7FnHiR8qb847v0o0t0ByBEGwOCGlyqBZhJLaPztTEEQUp6ALTo4llmvsTieX1",
  catSneakers:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDOJ9rpSFF2aikJTfnCITxPSf8_FBaW1OiikfuAYGyah1rUVJeLpIMNeC-VIQg-u3xenZv7WPd2ILNm-L_Twb6Myu9u7LAInR-YLA_fyNesujBxY1OLFISE2bRuANKITSP72T-OIwq_TfRmCUtPkD06ey_BvINKknHOcJ5dTxNcEZgwNL5bGB0hOxorwvgXjtcXiWeRdGRfavRK9Ts4V9pcJRHFyEaH_H_z9kRv0HE6",
  catCasual:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDxRNzTnn2JApeg_ZX1HRWGmdyxDaAg9dmCAbS8DEGnUSWPYHhXpRjGGqeVtwYkaK-f8rU0lx4EDgoVVgHNZ43FOlQ4x3dqAlN6ZmSnwHYppedU9FkDGiUduebx7p4aNFBV8FI9iNnEzCukvG_de2f0zOxeFH8coXvj2kYcOZPTos236xOqi8zeq5mN_fP9nSJp2N_6tEI5d6ZdEJ5T8XF7DwSk5fEO5mnNeQ7sDI5c",
  catSports:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuD5xh8r1efIJRbxNQcBYDO749CygeBURNP1RU4M0TKYMHVbcB2A9tnT6KwDrZjFRSFVZCtWHE7QSJDcaseaeesGuUMKr1OWnhXLaLsBR6utHJvtb2Fk_QqVGK8c6r4UK4qYWBxK3LPBBJ5TpWpO3dhY7wHwBRRuu_gwu3kBunfsmWmPuMaMkFcjGdmFvABsZuJ3-BynDY4KNGQrorxVrA8CYv_W_vHoocLO-X7YkqNh",
  catFormal:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBRMmJCzBPHglxrT-ORtT3DbZDfv5qx32Cc4g5ZskuUPs6REI1y9ZTGhaXdmS6nVMtOWxFAFbR9AcjxWuHtooYKgeaqy06IjG9yFJtIdyVYxO7zwiBL50UebGidG0R7uojiSgwarpMFh_Rf9J1f8ef4Z1_epb89L1XA8DQBC9WgDjSa2PJlIhnVWVidwsGizoN7Im2X2B3NW4qsNaPdf3bcTKuVUtizjJzdYtaIZATt",
  ig1: "https://lh3.googleusercontent.com/aida-public/AB6AXuBrKaZbdvUI5hk8QVC0eeOtlxMMbfW9ZxnW98ezKxhM-H23wU0iK66KQSVzdYJAxqomLDZ4dxyKi17JoqNz9Hu_iZBKbva5lAKu4Ea0_LnUUSdPa2LJ5WN_P9rgmXD3NVBCTB37JVUyAD8bOje_FiCgZmT26bpvkwzxyzOX8EO4TsjDEwV1Vxiiwue5QXWTSXxtE61fCoXFOegStAbYQPDVnt58fmqzcIxByGjFURWi",
  ig2: "https://lh3.googleusercontent.com/aida-public/AB6AXuCM3ZYKhnXl_Cj_8pK8fM5a_umwLXo3wuByjBsYio5J9WNmXpwdaNbx5tepMlJFs19FJL02awiUTg3Fl28O6J3GQZ-8zarJqv6OF4odguPeSRrIfCmSf8pb7SUSqpsqbH3LEvnp-K1nBFdt20LhhU6etuwwOTOaqwNZqKNH29OPdy27RWmUne97kQjXdhoZmbb2slgbTlGNsRfRUUuuFEMG1PKUCJ2gZY0aEcc5SrWC",
  ig3: "https://lh3.googleusercontent.com/aida-public/AB6AXuDI2ZM7WeH1dN7Mbtzh8YlIhIJPd32ks0tY0JQ0IAh5HUHHsSHu-TCK-KV15-1amPhksEP90_ZcQhu5T-Gaqte1ZQrD6FGZ3BVDVsecbm07HZkHsS6bjKhju_hpqswbNdSv9Z4hVava4N6nlrkVLN1CFIgicKiIOZUr0A5gcP1vjT_Sx-yBrGRoTrapJT3ZaozM5Yx1Nj6dnpp7tCPv_lJNuRhMKDO3p2Qeh2Pi_5Xd",
  ig4: "https://lh3.googleusercontent.com/aida-public/AB6AXuAb1_ZP3QgUn4GxNvif1SBRFEbwAP_M0xO1uliG0txxtE0g_GlBZUIMSW1eCPlJet-Zz-tuzXTHJMioIv2qf8-Z_RqOcwwVma9TJpULOcVUS3bcQTx5UciwTWWsb5MGQYnDAbaIgNE6JaffAFd6IseubEMqYWmQOOvZBj0XEAYqRPtGcRfALUNpszTnCFOLoTT73OYoVofaSxOkMlsQLuuJWU_BPWKIDXypgOJ82VwU",
  orderLoafer:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCXvMe1ffTSD4KpZLgzveS_HVTk81dALn1oCjygYD9b1Nk5zo-jgo6aTyWS11SZ5zHEuZQ3_cxhABltDoC1t6Lyv0Ga7Ss_uiVyarz3ZI-WdpzeHn9Ue0_1TC0DJf30zgUnOUMwtebm_Sp_mzOPno5ACgvl-TuQ63ROJULcf81hd4rTC7c7DF2CPdx4otdbB9OoiwMRKilu_ZA4Y2p8QU7qs5pQKTW7NbhmwqSWCsfR",
  historyAura:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuB3We4riXr_jlZxBxbRWRE0BKmNTN_Pb8yRDPdK2Chw8SVgLyrMhgYiCgN4lmKZ5Y7zSSLKpsprDfZDSsABFnFYR5HgE3bNuQ3K6hbaJuRIOY0ufI19kOp4cdCFEQiBLAuPCaY2cgEQs-4C88UWNVgrhHe2xtG5nTQxoKIfRYfk4h8iURVNXpbhhYszgT63OX_XgvVpfSuwisFoEkaNEA3jzQurAvkBrWND_PUKte8r",
  historyDerby:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuD5rNW1eCevmmERXV9rQdDp1HL9Y25lVvRDuMfR5mnAsEV3ZSlVLwkI18nfKlCqVvnRucvZD6ooniZKKlqPzdGepaE1yNcWFL2vq4a83p6gd75u6ZjPUMli_TCWhHZcVFsEnF5QBMEahhSCY3LD_UmeSKla7uwbgxBKQMoXkH7dcbeQ-cv2R56YglSXvWZe6NhLBowWLvxaYiIz-PGsMzsD3Ryf3hoE4X2CjfRan21Z",
} as const;

export const COLORS: Record<string, ColorOption> = {
  black: { id: "black", name: "Triple Black", hex: "#101012" },
  white: { id: "white", name: "Pure White", hex: "#ecebe4" },
  grey: { id: "grey", name: "Monolith Grey", hex: "#353438" },
  sand: { id: "sand", name: "Earth Sand", hex: "#e0c298" },
  olive: { id: "olive", name: "Olive Drab", hex: "#454747" },
  navy: { id: "navy", name: "Deep Navy", hex: "#09090b" },
  oxblood: { id: "oxblood", name: "Oxblood Carmine", hex: "#93000a" },
  cognac: { id: "cognac", name: "Cigar Brown", hex: "#8e7551" },
  silver: { id: "silver", name: "Lunar Silver", hex: "#c8c6c8" },
};

export const COLOR_SWATCHES = [
  COLORS.black,
  COLORS.white,
  COLORS.grey,
  COLORS.sand,
  COLORS.olive,
  COLORS.navy,
  COLORS.oxblood,
];

export const CATALOG_SIZES = [
  "6",
  "6.5",
  "7",
  "7.5",
  "8",
  "8.5",
  "9",
  "9.5",
  "10",
  "10.5",
  "11",
  "12",
];

const POOLS: Record<CatalogCategory, string[]> = {
  sneakers: [
    IMAGES.apex,
    IMAGES.monoSlip,
    IMAGES.retro,
    IMAGES.spectre,
    IMAGES.aura,
    IMAGES.kuro,
    IMAGES.aether,
    IMAGES.catSneakers,
  ],
  casual: [
    IMAGES.venetian,
    IMAGES.phantom,
    IMAGES.catCasual,
    IMAGES.derbyWedge,
    IMAGES.catFormal,
  ],
  sports: [
    IMAGES.hyperpulse,
    IMAGES.aeroform,
    IMAGES.veloce,
    IMAGES.vortex,
    IMAGES.catSports,
  ],
  formal: [
    IMAGES.derby,
    IMAGES.chelsea,
    IMAGES.vanguard,
    IMAGES.derbyWedge,
    IMAGES.catFormal,
  ],
};

const ACCESSORY_POOL = [
  IMAGES.careKit,
  IMAGES.spray,
  IMAGES.socks,
  IMAGES.shoeTrees,
];

function buildGallery(image: string, category: ProductCategory): string[] {
  const pool =
    category === "accessory" ? ACCESSORY_POOL : POOLS[category as CatalogCategory];
  return [image, ...pool.filter((src) => src !== image)].slice(0, 4);
}

type HeroInput = Omit<Product, "gallery" | "catalog"> & {
  gallery?: string[];
  catalog?: boolean;
};

function hero(input: HeroInput): Product {
  return {
    ...input,
    gallery: input.gallery ?? buildGallery(input.image, input.category),
    catalog: input.catalog ?? true,
  };
}

const HEROES: Product[] = [
  hero({
    slug: "apex-runner-01",
    name: "SOLE Apex Runner 01",
    line: "SOLE STORE ATELIER",
    category: "sneakers",
    description:
      "Monolithic carbon weave silhouette with adaptive nitrogen foam cushioning.",
    price: 16990,
    compareAt: 19990,
    image: IMAGES.apex,
    badge: { label: "NEW DROP", tone: "solid" },
    rating: 4.9,
    reviews: 118,
    colors: [COLORS.black, COLORS.grey, COLORS.sand],
    sizes: ["7", "8", "9", "10", "11"],
    meta: "Free Dispatch",
    releaseStatus: "ready",
    arrival: 1200,
    featured: 0,
    stock: 8,
    story:
      "A brutalist runner built on a monolithic carbon-weave chassis, tuned for collectors who demand architectural presence and all-day propulsion.",
  }),
  hero({
    slug: "derby-noir-handcrafted",
    name: "Derby Noir Handcrafted",
    line: "SOLE STORE BESPOKE",
    category: "formal",
    description:
      "Full-grain Tuscan calfskin with hand-welted Goodyear sole construction.",
    price: 22490,
    image: IMAGES.derby,
    badge: { label: "FORMAL ATELIER", tone: "muted" },
    rating: 5,
    reviews: 64,
    colors: [COLORS.black, COLORS.cognac],
    sizes: ["7.5", "8", "9", "10"],
    meta: "Crafted in Italy",
    releaseStatus: "ready",
    arrival: 1180,
    featured: 1,
    stock: 5,
    story:
      "Hand-burnished in a Tuscan atelier, the Derby Noir pairs a sculpted chisel toe with a Goodyear-welted sole that softens with every wear.",
  }),
  hero({
    slug: "monolith-slip-on-casual",
    name: "Monolith Slip-On Casual",
    line: "SOLE STORE ESSENTIALS",
    category: "casual",
    description:
      "Zero-tension internal knit chassis with high-rebound natural latex footbed.",
    price: 9990,
    compareAt: 12990,
    image: IMAGES.monoSlip,
    badge: { label: "BEST SELLER", tone: "muted" },
    rating: 4.8,
    reviews: 203,
    colors: [COLORS.white, COLORS.grey, COLORS.sand, COLORS.black],
    sizes: ["6", "8", "9", "11"],
    meta: "Stock: 4 Units",
    releaseStatus: "ready",
    arrival: 1160,
    featured: 2,
    stock: 4,
    story:
      "A seamless knit slip-on engineered for zero-tension comfort, finished with a natural latex footbed that rebounds without memory loss.",
  }),
  hero({
    slug: "hyperpulse-carbon-sport",
    name: "HyperPulse Carbon Sport",
    line: "SOLE STORE KINETIC",
    category: "sports",
    description:
      "Dual carbon propulsion plate tuned for explosive cadence and marathon endurance.",
    price: 14200,
    image: IMAGES.hyperpulse,
    badge: { label: "PERFORMANCE", tone: "muted" },
    rating: 4.9,
    reviews: 97,
    colors: [COLORS.black, COLORS.silver],
    sizes: ["8", "9", "10", "10.5"],
    meta: "Free Delivery",
    releaseStatus: "ready",
    arrival: 1140,
    featured: 3,
    stock: 7,
    story:
      "A dual-plate race machine with a nitrogen-infused stack, developed for runners chasing a faster cadence over long distances.",
  }),
  hero({
    slug: "retro-low-top-vintage-chalk",
    name: "Retro Low-Top Vintage Chalk",
    line: "SOLE STORE ARCHIVE",
    category: "sneakers",
    description:
      "Heritage basketball DNA reconstructed with buttery nappa leather and oxidized soles.",
    price: 11490,
    image: IMAGES.retro,
    badge: { label: "TRENDING", tone: "gold" },
    rating: 4.7,
    reviews: 86,
    colors: [COLORS.white, COLORS.sand],
    sizes: ["7", "8", "9", "10"],
    meta: "Collector Favorite",
    releaseStatus: "ready",
    arrival: 1120,
    featured: 4,
    stock: 9,
    story:
      "An archival basketball profile rebuilt in buttery nappa leather, with hand-oxidized soles and a chalk-white patina that ages beautifully.",
  }),
  hero({
    slug: "architectural-chelsea-boot",
    name: "Architectural Chelsea Boot",
    line: "SOLE STORE COUTURE",
    category: "formal",
    description:
      "Handcrafted monolith silhouette with elasticated gusset and sculptured block tread.",
    price: 24990,
    image: IMAGES.chelsea,
    badge: { label: "LUXURY", tone: "gold" },
    rating: 5,
    reviews: 41,
    colors: [COLORS.black, COLORS.grey],
    sizes: ["8", "9", "10", "11"],
    meta: "VIP Allocation",
    releaseStatus: "ready",
    arrival: 1100,
    featured: 5,
    stock: 4,
    story:
      "A Chelsea boot carved into a monolithic silhouette, with a sculpted lug tread and elasticated gusset engineered for a glove-like instep.",
  }),
  hero({
    slug: "aeroform-trail-runner",
    name: "AeroForm Trail Runner",
    line: "SOLE STORE EXPEDITION",
    category: "sports",
    description:
      "Gore-infused weatherproof ripstop envelope with high-traction omni-terrain cleats.",
    price: 13800,
    image: IMAGES.aeroform,
    badge: { label: "LIMITED", tone: "gold" },
    rating: 4.9,
    reviews: 73,
    colors: [COLORS.olive, COLORS.black],
    sizes: ["8", "9", "10"],
    meta: "Stock: 2 Left",
    releaseStatus: "ready",
    arrival: 1080,
    featured: 6,
    stock: 2,
    story:
      "Built for wet, technical terrain: a weatherproof ripstop envelope over an omni-terrain cleat, with a reinforced rock plate for long descents.",
  }),
  hero({
    slug: "venetian-suede-loafer",
    name: "Venetian Suede Loafer",
    line: "SOLE STORE MILANO",
    category: "casual",
    description:
      "Supple hand-buffed calf suede with unlined summer lining and stacked leather heel.",
    price: 17500,
    compareAt: 21000,
    image: IMAGES.venetian,
    badge: { label: "HANDMADE", tone: "gold" },
    rating: 4.9,
    reviews: 156,
    colors: [COLORS.cognac, COLORS.black],
    sizes: ["8", "9", "10", "11"],
    meta: "Free Dust Bags",
    releaseStatus: "ready",
    arrival: 1060,
    featured: 7,
    stock: 6,
    story:
      "Hand-buffed in Milan from a single panel of calf suede, the Venetian is unlined for summer and finished on a stacked leather heel.",
  }),
  hero({
    slug: "spectre-runner-01",
    name: "Spectre Runner 01",
    line: "SOLE STORE ATELIER // EDITION 04",
    category: "sneakers",
    description:
      "Triple Obsidian // Monochromatic architectural silhouette with low-profile sculpted tread and bespoke cryptographic hardware.",
    price: 16990,
    compareAt: 19990,
    image: IMAGES.spectre,
    gallery: [
      IMAGES.spectre,
      IMAGES.spectreSide,
      IMAGES.spectreTop,
      IMAGES.spectreHeel,
    ],
    badge: { label: "LIMITED DROP", tone: "gold" },
    rating: 4.9,
    reviews: 84,
    colors: [COLORS.black, COLORS.white, COLORS.grey],
    sizes: ["6", "7", "8", "9", "10", "11"],
    meta: "NFC Authenticated",
    releaseStatus: "ready",
    arrival: 1240,
    featured: 8,
    stock: 4,
    story:
      "Edition 04 of the Spectre program: a triple-obsidian runner with a hand-finished carbon counter, NFC provenance chip, and only four pairs left in the allocation.",
  }),
  hero({
    slug: "aura-mono-runner-v2",
    name: "Aura Mono Runner v2",
    line: "ATELIER CORE",
    category: "sneakers",
    description:
      "Sculpted EVA foam unit with breathable Italian nubuck panelling.",
    price: 14990,
    image: IMAGES.aura,
    badge: { label: "LIMITED DROP", tone: "gold" },
    rating: 4.9,
    reviews: 91,
    colors: [COLORS.grey, COLORS.sand, COLORS.black],
    sizes: ["7", "8", "9", "10", "11"],
    meta: "Free Express Courier",
    releaseStatus: "ready",
    arrival: 1040,
    featured: 9,
    stock: 5,
    story:
      "The second-generation Aura runner sculpts EVA into a single flowing form, wrapped in perforated Italian nubuck for breathable structure.",
  }),
  hero({
    slug: "kuro-minimalist-low",
    name: "Kuro Minimalist Low",
    line: "MINIMAL SERIES",
    category: "sneakers",
    description:
      "Japanese smooth nappa leather with Margom rubber vulcanized cupsole.",
    price: 16200,
    image: IMAGES.kuro,
    badge: { label: "BEST SELLER", tone: "gold" },
    rating: 4.8,
    reviews: 142,
    colors: [COLORS.black, COLORS.grey],
    sizes: ["7", "8", "9", "10", "11"],
    meta: "Free Express Courier",
    releaseStatus: "ready",
    arrival: 1020,
    featured: 10,
    stock: 7,
    story:
      "A study in reduction: Japanese nappa leather, waxed cotton laces and a Margom cupsole, with every seam removed that isn't structural.",
  }),
  hero({
    slug: "veloce-carbon-sprint",
    name: "Veloce Carbon Sprint",
    line: "PERFORMANCE",
    category: "sports",
    description:
      "Carbon spoon-plate with maximum rebound micro-cellular foam.",
    price: 11990,
    image: IMAGES.veloce,
    badge: { label: "SPEED SPEC", tone: "muted" },
    rating: 4.9,
    reviews: 205,
    colors: [COLORS.black, COLORS.silver],
    sizes: ["7", "8", "9", "10", "11"],
    meta: "Free Express Courier",
    releaseStatus: "ready",
    arrival: 1000,
    featured: 11,
    stock: 6,
    story:
      "A spoon-plated sprint shoe with a translucent ripstop upper, built to convert cadence into forward motion with minimal wasted energy.",
  }),
  hero({
    slug: "phantom-highcraft-loafer",
    name: "Phantom Highcraft Loafer",
    line: "FORMAL LAB",
    category: "casual",
    description:
      "Deep obsidian burnished box-calf with reinforced storm welt.",
    price: 18490,
    image: IMAGES.phantom,
    badge: { label: "HAND-CRAFTED", tone: "muted" },
    rating: 4.9,
    reviews: 58,
    colors: [COLORS.black, COLORS.cognac],
    sizes: ["7", "8", "9", "10", "11"],
    meta: "Free Express Courier",
    releaseStatus: "ready",
    arrival: 980,
    featured: 12,
    stock: 5,
    story:
      "A high-craft loafer in burnished box-calf, set on a reinforced storm welt and a low architectural lug for wet-city wear.",
  }),
  hero({
    slug: "vortex-c-01",
    name: "Vortex C-01 // Tactical Black",
    line: "SOLE STORE ATELIER",
    category: "sports",
    description:
      "GORE-TEX infused architectural terrain explorer.",
    price: 18990,
    image: IMAGES.vortex,
    badge: { label: "COLLAB", tone: "muted" },
    rating: 4.8,
    reviews: 39,
    colors: [COLORS.black, COLORS.grey],
    sizes: ["8", "9", "10", "11"],
    meta: "Atelier Sealed",
    releaseStatus: "ready",
    arrival: 960,
    featured: 13,
    stock: 3,
    story:
      "A collaboration terrain explorer with a GORE-TEX bootie, aggressive lug geometry and a reinforced toe bumper for technical approaches.",
  }),
  hero({
    slug: "aether-low-asphalt",
    name: "Aether Low // Asphalt",
    line: "SOLE STORE FOOTWEAR",
    category: "sneakers",
    description:
      "Italian nappa leather low-top with vulcanized outsole.",
    price: 14490,
    image: IMAGES.aether,
    badge: { label: "PRE-RELEASE", tone: "muted" },
    rating: 4.8,
    reviews: 47,
    colors: [COLORS.grey, COLORS.black],
    sizes: ["7", "8", "9", "10", "11"],
    meta: "Pre-Release",
    releaseStatus: "ready",
    arrival: 940,
    featured: 14,
    stock: 5,
    story:
      "An asphalt-grey low-top in Italian nappa, set on a vulcanized outsole and finished with a tonal leather heel tab.",
  }),
  hero({
    slug: "vanguard-lug-sole-bone",
    name: "Vanguard Lug Sole // Bone",
    line: "AVANT-GARDE MOLDED SOLE",
    category: "formal",
    description:
      "Bone-white chunky lug sole derby boot with an architectural molded platform.",
    price: 21000,
    image: IMAGES.vanguard,
    badge: { label: "LOW STOCK", tone: "muted" },
    rating: 4.9,
    reviews: 34,
    colors: [COLORS.white, COLORS.black],
    sizes: ["8", "9", "10", "11"],
    meta: "Stock: 2 Left",
    releaseStatus: "ready",
    arrival: 920,
    featured: 15,
    stock: 2,
    story:
      "A bone-white derby boot on a molded lug platform, bridging sartorial upper construction with an unapologetically sculptural sole.",
  }),
  hero({
    slug: "derby-wedge-carbon-suede",
    name: "Derby Wedge // Carbon Suede",
    line: "FORMAL ATELIER",
    category: "formal",
    description:
      "Deep carbon suede derby with an architectural cleated wedge sole.",
    price: 18900,
    image: IMAGES.derbyWedge,
    badge: { label: "LIMITED", tone: "gold" },
    rating: 4.8,
    reviews: 29,
    colors: [COLORS.black, COLORS.grey],
    sizes: ["8", "9", "10", "11"],
    meta: "Hand-numbered Archive",
    releaseStatus: "ready",
    arrival: 900,
    featured: 16,
    stock: 3,
    story:
      "A carbon-suede derby set on a cleated wedge, hand-numbered as part of a 120-pair archival run.",
  }),
  hero({
    slug: "atelier-shoe-preservation-kit",
    name: "Atelier Shoe Preservation Kit",
    line: "ARCHIVAL CARE LAB",
    category: "accessory",
    description:
      "Organic biodegradable cleaner, wild boar brush & hydro-shield.",
    price: 2890,
    image: IMAGES.careKit,
    badge: { label: "ESSENTIAL", tone: "gold" },
    rating: 4.9,
    reviews: 212,
    colors: [COLORS.black],
    sizes: ["One Size"],
    meta: "Archive Essential",
    releaseStatus: "ready",
    arrival: 800,
    featured: 1000,
    stock: 42,
    catalog: false,
    story:
      "A complete preservation kit in an aluminium case: organic cleaner, wild-boar brush, microfiber cloth and a hydro-shield finish.",
  }),
  hero({
    slug: "nanotech-waterproof-spray",
    name: "Nanotech Waterproof Protector Spray",
    line: "ESSENTIAL CARE",
    category: "accessory",
    description:
      "Hydrophobic barrier engineered for archival suede & technical knit.",
    price: 1200,
    image: IMAGES.spray,
    badge: { label: "ESSENTIAL CARE", tone: "gold" },
    rating: 4.8,
    reviews: 134,
    colors: [COLORS.black],
    sizes: ["One Size"],
    meta: "Add-On",
    releaseStatus: "ready",
    arrival: 780,
    featured: 1001,
    stock: 80,
    catalog: false,
    story:
      "A nanotech hydrophobic barrier that bonds to suede, nubuck and technical knit without altering hand-feel or breathability.",
  }),
  hero({
    slug: "heavy-gauge-slub-socks",
    name: "Heavy Gauge Slub Socks 3-Pack",
    line: "ACCESSORY",
    category: "accessory",
    description:
      "Japanese heavy-gauge raw cotton socks with a textured slub finish.",
    price: 2800,
    image: IMAGES.socks,
    colors: [COLORS.white],
    sizes: ["One Size"],
    rating: 4.7,
    reviews: 61,
    meta: "3-Pack",
    releaseStatus: "ready",
    arrival: 760,
    featured: 1002,
    stock: 30,
    catalog: false,
    story:
      "A three-pack of Japanese heavy-gauge cotton socks, knit with a raw slub texture that pairs with both tailored and technical silhouettes.",
  }),
  hero({
    slug: "aromatic-cedar-shoe-trees",
    name: "Aromatic Cedar Shoe Trees",
    line: "PRESERVATION",
    category: "accessory",
    description:
      "Aromatic cedar shoe trees with engraved brass hardware.",
    price: 3400,
    image: IMAGES.shoeTrees,
    colors: [COLORS.cognac],
    sizes: ["One Size"],
    rating: 4.9,
    reviews: 48,
    meta: "Engraved Brass",
    releaseStatus: "ready",
    arrival: 740,
    featured: 1003,
    stock: 24,
    catalog: false,
    story:
      "Aromatic cedar trees with adjustable toe and heel pieces, finished with engraved brass hardware and a natural oil that deodorises.",
  }),
];

const CATEGORY_TARGETS: Record<CatalogCategory, number> = {
  sneakers: 54,
  casual: 32,
  sports: 26,
  formal: 16,
};

const GENERATED_POOLS: Record<CatalogCategory, string[]> = {
  sneakers: [
    "Nocturne Court",
    "Vector Low",
    "Eclipse Glide",
    "Atlas Drift",
    "Sable Runner",
    "Orbit Trainer",
    "Signal Low",
    "Phantom Mesh",
    "Static Runner",
    "Domain Low",
  ],
  casual: [
    "Milano Mule",
    "Sculpt Slide",
    "Softstep Loafer",
    "Sabbia Moccasin",
    "Riva Driving Shoe",
    "Lido Slip-On",
    "Piazza Loafer",
  ],
  sports: [
    "Kinetic Surge",
    "Tempo Racer",
    "Stratos Distance",
    "Carbon Apex",
    "Velocity Track",
    "Aero Circuit",
    "Intensity Pro",
  ],
  formal: [
    "Oxford Monolith",
    "Chisel Toe Derby",
    "Atelier Monk Strap",
    "Goodyear Boot",
    "Sartorial Oxford",
    "Palazzo Loafer",
  ],
};

const GENERATED_LINES: Record<CatalogCategory, string> = {
  sneakers: "SOLE STORE ATELIER",
  casual: "SOLE STORE ESSENTIALS",
  sports: "SOLE STORE KINETIC",
  formal: "SOLE STORE BESPOKE",
};

const GENERATED_DESCRIPTIONS: Record<CatalogCategory, string[]> = {
  sneakers: [
    "Sculptural layered upper with nitrogen-infused cushioning and hand-finished edge paint.",
    "Deconstructed leather and technical mesh over a monochrome cupsole.",
    "Archival runner proportions rebuilt with a carbon-weave heel counter.",
    "Tonal nubuck panels with a sculpted EVA midsole and waxed laces.",
  ],
  casual: [
    "Unlined calf leather upper with a high-rebound latex footbed.",
    "Soft suede moccasin construction on a lightweight stacked heel.",
    "Architectural slip-on with hand-burnished edges and a concealed gusset.",
    "Everyday leather silhouette with a sculpted rubber outsole.",
  ],
  sports: [
    "Nitrogen-infused midsole with a propulsion plate tuned for daily mileage.",
    "Engineered mesh racer with a reinforced heel counter and carbon shank.",
    "Technical trail envelope with omni-terrain lugs and a rock plate.",
    "Lightweight distance shoe with a responsive micro-cellular foam stack.",
  ],
  formal: [
    "Hand-welted Goodyear construction in full-grain Italian calfskin.",
    "Burnished leather upper on an architectural leather-and-rubber sole.",
    "Sartorial last with a chiselled toe and hand-finished patina.",
    "Hand-numbered archival derby with a sculpted storm welt.",
  ],
};

const PRICE_RANGES: Record<CatalogCategory, [number, number]> = {
  sneakers: [9990, 34990],
  casual: [8990, 29990],
  sports: [11990, 36990],
  formal: [17990, 39990],
};

const SIZE_SETS = [
  ["6", "7", "8", "9", "10", "11"],
  ["7", "7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11"],
  ["7.5", "8", "9", "10"],
  ["8", "9", "10", "11"],
  ["6", "6.5", "7", "7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11"],
];

const COLOR_SETS: ColorOption[][] = [
  [COLORS.black, COLORS.grey, COLORS.sand],
  [COLORS.black, COLORS.white],
  [COLORS.grey, COLORS.black, COLORS.olive],
  [COLORS.black, COLORS.cognac],
  [COLORS.black, COLORS.silver, COLORS.grey],
  [COLORS.sand, COLORS.grey, COLORS.black],
  [COLORS.white, COLORS.black],
  [COLORS.oxblood, COLORS.black],
];

const GENERATED_BADGES: Array<ProductBadge | undefined> = [
  { label: "NEW DROP", tone: "solid" },
  undefined,
  undefined,
  { label: "BEST SELLER", tone: "muted" },
  undefined,
  undefined,
  { label: "LIMITED", tone: "gold" },
  undefined,
  { label: "TRENDING", tone: "gold" },
  undefined,
];

const META_LABELS = [
  "Free Dispatch",
  "Complimentary Air Express",
  "Atelier Sealed",
  "NFC Verified",
];

function buildGeneratedProducts(): Product[] {
  const generated: Product[] = [];
  let globalIndex = 0;

  (Object.keys(CATEGORY_TARGETS) as CatalogCategory[]).forEach((category) => {
    const heroCount = HEROES.filter(
      (product) => product.catalog && product.category === category,
    ).length;
    const needed = CATEGORY_TARGETS[category] - heroCount;
    const names = GENERATED_POOLS[category];
    const editions: Record<string, number> = {};
    const pool = POOLS[category];

    for (let index = 0; index < needed; index += 1) {
      const baseName = names[index % names.length];
      editions[baseName] = (editions[baseName] ?? 0) + 1;
      const edition = editions[baseName];
      const name = `${baseName} ${String(edition).padStart(2, "0")}`;
      const image = pool[(index + 2) % pool.length];
      const [min, max] = PRICE_RANGES[category];
      const price = roundTo90(min + ((globalIndex * 2371) % (max - min)));
      const compareAt =
        index % 4 === 0
          ? Math.min(39990, Math.round((price * 1.18) / 10) * 10)
          : undefined;
      const colors = COLOR_SETS[(globalIndex + 1) % COLOR_SETS.length];
      const sizes = SIZE_SETS[globalIndex % SIZE_SETS.length];
      const status = globalIndex % 7 === 0 ? "archival" : "ready";

      generated.push({
        slug: `${slugify(baseName)}-${String(edition).padStart(2, "0")}`,
        name,
        line: GENERATED_LINES[category],
        category,
        description:
          GENERATED_DESCRIPTIONS[category][
            globalIndex % GENERATED_DESCRIPTIONS[category].length
          ],
        price,
        compareAt: compareAt && compareAt > price ? compareAt : undefined,
        image,
        gallery: buildGallery(image, category),
        badge: GENERATED_BADGES[globalIndex % GENERATED_BADGES.length],
        rating: Number((4.6 + (globalIndex % 5) * 0.1).toFixed(1)),
        reviews: 24 + ((globalIndex * 17) % 140),
        colors,
        sizes,
        meta: META_LABELS[globalIndex % META_LABELS.length],
        releaseStatus: status,
        arrival: 700 - globalIndex,
        featured: 100 + globalIndex,
        stock: 1 + ((globalIndex * 3) % 9),
        story:
          "A new entry in the SOLE STORE archive, verified at the atelier and released in a strictly limited allocation.",
        catalog: true,
      });

      globalIndex += 1;
    }
  });

  return generated;
}

export const PRODUCTS: Product[] = [...HEROES, ...buildGeneratedProducts()];

export const CATALOG_PRODUCTS = PRODUCTS.filter((product) => product.catalog);

export const ACCESSORY_PRODUCTS = PRODUCTS.filter(
  (product) => product.category === "accessory",
);

export function getProduct(slug: string): Product | undefined {
  return PRODUCTS.find((product) => product.slug === slug);
}

export function getProductsBySlugs(slugs: string[]): Product[] {
  return slugs
    .map((slug) => getProduct(slug))
    .filter((product): product is Product => Boolean(product));
}

export function getRelated(slug: string, limit = 3): Product[] {
  const current = getProduct(slug);
  if (!current) return CATALOG_PRODUCTS.slice(0, limit);
  return CATALOG_PRODUCTS.filter(
    (product) =>
      product.slug !== slug &&
      (product.category === current.category ||
        product.price >= current.price - 5000),
  ).slice(0, limit);
}

export const CATEGORY_COUNTS = {
  all: CATALOG_PRODUCTS.length,
  sneakers: CATALOG_PRODUCTS.filter((p) => p.category === "sneakers").length,
  casual: CATALOG_PRODUCTS.filter((p) => p.category === "casual").length,
  sports: CATALOG_PRODUCTS.filter((p) => p.category === "sports").length,
  formal: CATALOG_PRODUCTS.filter((p) => p.category === "formal").length,
};

export const HOME_FEATURED_SLUGS = [
  "aura-mono-runner-v2",
  "kuro-minimalist-low",
  "spectre-runner-01",
  "apex-runner-01",
  "phantom-highcraft-loafer",
  "venetian-suede-loafer",
  "monolith-slip-on-casual",
  "veloce-carbon-sprint",
  "hyperpulse-carbon-sport",
  "aeroform-trail-runner",
  "architectural-chelsea-boot",
  "derby-noir-handcrafted",
];

export const PDP_RECOMMENDATION_SLUGS = [
  "aether-low-asphalt",
  "atelier-shoe-preservation-kit",
  "vortex-c-01",
];

export const CART_SUGGESTION_SLUGS = [
  "vanguard-lug-sole-bone",
  "derby-wedge-carbon-suede",
  "heavy-gauge-slub-socks",
  "aromatic-cedar-shoe-trees",
];

export const DEFAULT_CART = [
  { slug: "spectre-runner-01", size: "8", color: "Triple Black", qty: 1 },
  { slug: "venetian-suede-loafer", size: "9", color: "Cigar Brown", qty: 1 },
];

export const DEFAULT_WISHLIST = [
  "kuro-minimalist-low",
  "veloce-carbon-sprint",
  "vanguard-lug-sole-bone",
];
