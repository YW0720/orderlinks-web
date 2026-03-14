"use client";

import { useMemo, useState } from "react";

type Locale = "zh" | "en" | "fr" | "de";

type Labels = {
  title: string;
  desc: string;
  oneTimeTitle: string;
  oneTimeDesc: string;
  oneTimeLanguageCoverage: string;
  oneTimeLanguageNote: string;
  existingSite: string;
  yes: string;
  no: string;
  existingSiteDiscountNote: string;
  featuresForExistingSite: string;
  existingSiteFeatureRequired: string;
  contract: string;
  contract1Year: string;
  contract3Years: string;
  features: string;
  reservationFeature: string;
  posFeature: string;
  qrOrderFeature: string;
  takeawayOrderFeature: string;
  concurrentUsers: string;
  monthly: string;
  annual: string;
  note: string;
  custom: string;
  includes: string;
  contactTitle: string;
  email: string;
  phone: string;
  phoneHours: string;
  whatsapp: string;
  processTitle: string;
  processDesc: string;
};

const PHONE_DISPLAY = "+41 78 249 59 83";
const PHONE_DIAL = "+41782495983";
const EMAIL = "contact@orderlinks.ch";
const WHATSAPP_LINK = "https://wa.me/41782495983";
const BASE_SETUP_FEE = 750;
const FEATURE_SETUP_DISCOUNT = 50;
const BASE_MONTHLY_3Y = 19;
const BASE_MONTHLY_1Y_DELTA = 10;
const RESERVATION_SURCHARGE_3Y = 20;
const RESERVATION_SURCHARGE_1Y = 30;
const POS_SURCHARGE_3Y = 30;
const POS_SURCHARGE_1Y = 40;
const POS_WITH_ORDER_SURCHARGE_3Y = 10;
const POS_WITH_ORDER_SURCHARGE_1Y = 20;

type OrderMode = "none" | "single" | "both";

function resolveSingleOrderTier(count: number) {
  if (count <= 50) {
    return { custom: false, surcharge1: 60, surcharge3: 50 };
  }
  if (count <= 100) {
    return { custom: false, surcharge1: 90, surcharge3: 70 };
  }
  if (count <= 150) {
    return { custom: false, surcharge1: 130, surcharge3: 100 };
  }
  if (count <= 200) {
    return { custom: false, surcharge1: 190, surcharge3: 150 };
  }
  return { custom: true, surcharge1: 0, surcharge3: 0 };
}

function resolveBothOrderTier(count: number) {
  if (count <= 50) {
    return { custom: false, surcharge1: 70, surcharge3: 60 };
  }
  if (count <= 100) {
    return { custom: false, surcharge1: 100, surcharge3: 80 };
  }
  if (count <= 150) {
    return { custom: false, surcharge1: 140, surcharge3: 110 };
  }
  if (count <= 200) {
    return { custom: false, surcharge1: 200, surcharge3: 160 };
  }
  return { custom: true, surcharge1: 0, surcharge3: 0 };
}

const TEXT: Record<Locale, Labels> = {
  zh: {
    title: "网站价格",
    desc: "根据功能组合与订单并发规模估算费用。",
    oneTimeTitle: "一次性首页定制费用",
    oneTimeDesc: "基础价格 750 CHF。每增加一项功能，网页定制费用减 50 CHF。",
    oneTimeLanguageCoverage: "默认包含法语、德语、英语三语支持",
    oneTimeLanguageNote: "；如需扩展更多语言版本，可根据内容范围与实施复杂度另行协商增补费用。",
    existingSite: "餐厅是否已经拥有网站？",
    yes: "有",
    no: "没有",
    existingSiteDiscountNote: "如已有网站，可商议直接接入；首页定制费用可优惠至 100 CHF 起（视接入难度而定）。",
    featuresForExistingSite: "选择需要接入的功能",
    existingSiteFeatureRequired: "已有网站时，至少需要选择一项接入功能。",
    contract: "合同年限",
    contract1Year: "1 年合同",
    contract3Years: "3 年合同",
    features: "功能选择",
    reservationFeature: "预约功能",
    posFeature: "POS 功能",
    qrOrderFeature: "扫码点餐",
    takeawayOrderFeature: "外卖点餐",
    concurrentUsers: "最多同时在线点餐人数",
    monthly: "预估月费",
    annual: "预估年费",
    note: "一次性费用和月费均包含维护，不包含域名。",
    custom: "该组合需要沟通报价",
    includes: "维护费用已包含，域名费用不包含。",
    contactTitle: "联系渠道",
    email: "邮箱",
    phone: "电话",
    phoneHours: "电话接通时间：工作日 18:00-21:00，周末 10:00-22:00",
    whatsapp: "WhatsApp",
    processTitle: "上线流程与支付说明",
    processDesc:
      "请将以上选项信息与餐厅资料（名字、地址、电话号码、邮箱、域名、简短描述、餐厅图片及描述）发送给我们，我们会先与您确认实施方案与上线排期。方案确认后，通常 5-10 天可完成上线。月费从交付日期开始计算。",
  },
  en: {
    title: "Website Pricing",
    desc: "Estimate pricing based on feature bundle and order concurrency tiers.",
    oneTimeTitle: "One-time homepage customization fee",
    oneTimeDesc: "Base price is 750 CHF. Website customization decreases by 50 CHF for each enabled feature.",
    oneTimeLanguageCoverage: "Includes French, German, and English by default",
    oneTimeLanguageNote:
      ". If additional languages are required, supplementary pricing can be discussed based on content scope and implementation complexity.",
    existingSite: "Do you already have a website?",
    yes: "Yes",
    no: "No",
    existingSiteDiscountNote:
      "If you already have a website, direct integration can be discussed; homepage customization may be discounted starting from 100 CHF depending on integration complexity.",
    featuresForExistingSite: "Select features to integrate",
    existingSiteFeatureRequired: "If a website already exists, at least one integration feature is required.",
    contract: "Contract term",
    contract1Year: "1 year contract",
    contract3Years: "3 years contract",
    features: "Features",
    reservationFeature: "Reservation feature",
    posFeature: "POS feature",
    qrOrderFeature: "QR ordering",
    takeawayOrderFeature: "Takeaway ordering",
    concurrentUsers: "Max concurrent online ordering users",
    monthly: "Estimated monthly fee",
    annual: "Estimated yearly fee",
    note: "One-time and monthly fees include maintenance; domain is excluded.",
    custom: "This combination requires custom quote",
    includes: "Maintenance is included; domain registration is excluded.",
    contactTitle: "Contact",
    email: "Email",
    phone: "Phone",
    phoneHours: "Phone support hours: Weekdays 18:00-21:00, Weekends 10:00-22:00",
    whatsapp: "WhatsApp",
    processTitle: "Launch process and payment notes",
    processDesc:
      "Please send us your selected options together with restaurant details (name, address, phone number, email, domain, short description, and restaurant images with captions). We will first confirm the implementation plan and launch schedule with you. Once the plan is confirmed, launch is usually completed within 5-10 days. The monthly fee starts from the delivery date.",
  },
  fr: {
    title: "Prix du site web",
    desc: "Estimez le prix selon les fonctionnalités et les paliers de concurrence de commande.",
    oneTimeTitle: "Frais uniques de personnalisation de la page d’accueil",
    oneTimeDesc: "Le prix de base est 750 CHF. Le coût de personnalisation web diminue de 50 CHF par fonctionnalité activée.",
    oneTimeLanguageCoverage: "Inclut par defaut le francais, l'allemand et l'anglais",
    oneTimeLanguageNote:
      ". Si vous souhaitez ajouter d'autres langues, un tarif complementaire peut etre discute selon le volume de contenu et la complexite de mise en oeuvre.",
    existingSite: "Avez-vous déjà un site web ?",
    yes: "Oui",
    no: "Non",
    existingSiteDiscountNote:
      "Si vous avez déjà un site web, une intégration directe peut être discutée ; la personnalisation de la page d'accueil peut être réduite à partir de 100 CHF selon la complexité d'intégration.",
    featuresForExistingSite: "Sélectionnez les fonctionnalités à intégrer",
    existingSiteFeatureRequired: "Si un site existe déjà, au moins une fonctionnalité d'intégration est requise.",
    contract: "Durée du contrat",
    contract1Year: "Contrat 1 an",
    contract3Years: "Contrat 3 ans",
    features: "Fonctionnalités",
    reservationFeature: "Fonction réservation",
    posFeature: "Fonction POS",
    qrOrderFeature: "Commande par QR",
    takeawayOrderFeature: "Commande à emporter",
    concurrentUsers: "Nombre max d'utilisateurs de commande en ligne simultanés",
    monthly: "Frais mensuels estimés",
    annual: "Frais annuels estimés",
    note: "Les frais uniques et mensuels incluent la maintenance; le domaine est exclu.",
    custom: "Cette combinaison demande un devis personnalisé",
    includes: "Maintenance incluse ; coût du domaine exclu.",
    contactTitle: "Contact",
    email: "E-mail",
    phone: "Téléphone",
    phoneHours: "Disponibilité : jours ouvrables 18:00-21:00, week-end 10:00-22:00",
    whatsapp: "WhatsApp",
    processTitle: "Mise en ligne et modalités de paiement",
    processDesc:
      "Merci de nous envoyer les options sélectionnées ainsi que les informations du restaurant (nom, adresse, téléphone, e-mail, domaine, courte description, images du restaurant et leurs descriptions). Nous confirmerons d'abord avec vous le plan de mise en œuvre et le planning de mise en ligne. Une fois le plan validé, la mise en ligne est généralement finalisée sous 5-10 jours. L'abonnement mensuel démarre à partir de la date de livraison.",
  },
  de: {
    title: "Website-Preis",
    desc: "Preis auf Basis von Funktionspaket und Gleichzeitigkeit bei Bestellungen schätzen.",
    oneTimeTitle: "Einmalige Kosten für Startseiten-Anpassung",
    oneTimeDesc: "Der Basispreis beträgt 750 CHF. Die Web-Anpassung sinkt pro aktivierter Funktion um 50 CHF.",
    oneTimeLanguageCoverage: "Standardmassig sind Franzosisch, Deutsch und Englisch enthalten",
    oneTimeLanguageNote:
      ". Falls weitere Sprachen gewunscht sind, konnen Zusatzkosten je nach Inhaltsumfang und Umsetzungsaufwand abgestimmt werden.",
    existingSite: "Haben Sie bereits eine Website?",
    yes: "Ja",
    no: "Nein",
    existingSiteDiscountNote:
      "Wenn Sie bereits eine Website haben, kann eine direkte Integration besprochen werden; die Startseiten-Anpassung kann je nach Integrationsaufwand ab 100 CHF reduziert werden.",
    featuresForExistingSite: "Wählen Sie die zu integrierenden Funktionen",
    existingSiteFeatureRequired: "Wenn bereits eine Website vorhanden ist, muss mindestens eine Integrationsfunktion gewählt werden.",
    contract: "Vertragslaufzeit",
    contract1Year: "1-Jahres-Vertrag",
    contract3Years: "3-Jahres-Vertrag",
    features: "Funktionen",
    reservationFeature: "Reservierungsfunktion",
    posFeature: "POS-Funktion",
    qrOrderFeature: "QR-Bestellung",
    takeawayOrderFeature: "Mitnahmebestellung",
    concurrentUsers: "Maximal gleichzeitige Online-Besteller",
    monthly: "Geschätzte Monatsgebühr",
    annual: "Geschätzte Jahresgebühr",
    note: "Einmalige und monatliche Kosten enthalten Wartung; Domain ist nicht enthalten.",
    custom: "Diese Kombination erfordert ein individuelles Angebot",
    includes: "Wartung ist enthalten; Domainkosten sind ausgeschlossen.",
    contactTitle: "Kontakt",
    email: "E-Mail",
    phone: "Telefon",
    phoneHours: "Telefonzeiten: Werktage 18:00-21:00, Wochenende 10:00-22:00",
    whatsapp: "WhatsApp",
    processTitle: "Go-live Ablauf und Zahlungsinfo",
    processDesc:
      "Bitte senden Sie uns die ausgewählten Optionen zusammen mit den Restaurantdaten (Name, Adresse, Telefonnummer, E-Mail, Domain, kurze Beschreibung sowie Restaurantbilder mit Beschreibung). Wir stimmen zunächst gemeinsam mit Ihnen den Umsetzungsplan und den Go-live-Zeitplan ab. Nach Bestätigung des Plans, der Go-live ist in der Regel innerhalb von 5-10 Tagen abgeschlossen. Die monatliche Gebühr beginnt ab dem Lieferdatum.",
  },
};

export function PricingCalculatorClient({ locale }: { locale: Locale }) {
  const labels = TEXT[locale];
  const [hasSite, setHasSite] = useState<"yes" | "no">("yes");
  const [contractYears, setContractYears] = useState<1 | 3>(3);
  const [hasReservation, setHasReservation] = useState(false);
  const [hasPos, setHasPos] = useState(false);
  const [hasQrOrder, setHasQrOrder] = useState(false);
  const [hasTakeawayOrder, setHasTakeawayOrder] = useState(false);
  const [concurrentInput, setConcurrentInput] = useState("50");

  const result = useMemo(() => {
    const concurrentCount = Number.parseInt(concurrentInput, 10);
    const orderMode: OrderMode = hasQrOrder && hasTakeawayOrder ? "both" : hasQrOrder || hasTakeawayOrder ? "single" : "none";

    const integrationFeatureCount =
      (hasReservation ? 1 : 0) + (hasPos ? 1 : 0) + (hasQrOrder ? 1 : 0) + (hasTakeawayOrder ? 1 : 0);
    const requiresIntegrationFeature = hasSite === "yes" && integrationFeatureCount === 0;
    const setupFee = BASE_SETUP_FEE - integrationFeatureCount * FEATURE_SETUP_DISCOUNT;

    if (requiresIntegrationFeature) {
      return {
        isCustom: true,
        setupFee,
        monthly: null as number | null,
        annual: null as number | null,
        concurrentCount: 0,
      };
    }

    const baseMonthly = contractYears === 1 ? BASE_MONTHLY_3Y + BASE_MONTHLY_1Y_DELTA : BASE_MONTHLY_3Y;
    const reservationSurcharge = hasReservation
      ? contractYears === 1
        ? RESERVATION_SURCHARGE_1Y
        : RESERVATION_SURCHARGE_3Y
      : 0;
    const posSurcharge = hasPos
      ? orderMode === "none"
        ? contractYears === 1
          ? POS_SURCHARGE_1Y
          : POS_SURCHARGE_3Y
        : contractYears === 1
          ? POS_WITH_ORDER_SURCHARGE_1Y
          : POS_WITH_ORDER_SURCHARGE_3Y
      : 0;

    let orderSurcharge = 0;
    if (orderMode !== "none") {
      if (Number.isNaN(concurrentCount) || concurrentCount <= 0) {
        return {
          isCustom: true,
          setupFee,
          monthly: null as number | null,
          annual: null as number | null,
          concurrentCount: 0,
        };
      }

      const concurrent =
        orderMode === "both" ? resolveBothOrderTier(concurrentCount) : resolveSingleOrderTier(concurrentCount);
      if (concurrent.custom) {
        return {
          isCustom: true,
          setupFee,
          monthly: null as number | null,
          annual: null as number | null,
          concurrentCount,
        };
      }
      orderSurcharge = contractYears === 1 ? concurrent.surcharge1 : concurrent.surcharge3;
    }

    const monthly = baseMonthly + reservationSurcharge + posSurcharge + orderSurcharge;
    return {
      isCustom: false,
      setupFee,
      monthly,
      annual: monthly * 12,
      concurrentCount: orderMode !== "none" ? concurrentCount : 0,
    };
  }, [concurrentInput, contractYears, hasPos, hasReservation, hasQrOrder, hasTakeawayOrder, hasSite]);

  const orderMode: OrderMode = hasQrOrder && hasTakeawayOrder ? "both" : hasQrOrder || hasTakeawayOrder ? "single" : "none";

  const selectedFeatures = [
    hasReservation ? labels.reservationFeature : null,
    hasPos ? labels.posFeature : null,
    hasQrOrder ? labels.qrOrderFeature : null,
    hasTakeawayOrder ? labels.takeawayOrderFeature : null,
  ].filter(Boolean);
  const selectedFeaturesText =
    selectedFeatures.length > 0
      ? `Selected features: ${selectedFeatures.join(" / ")}`
      : hasSite === "yes"
        ? labels.existingSiteFeatureRequired
        : locale === "zh"
          ? "当前为静态网页基础方案。"
          : "Current selection: static webpage baseline.";
  const isMissingRequiredFeature = hasSite === "yes" && selectedFeatures.length === 0;
  const customResultText = isMissingRequiredFeature ? labels.existingSiteFeatureRequired : labels.custom;
  const annualDisplayText = isMissingRequiredFeature ? "" : result.isCustom ? labels.custom : `${labels.annual}: ${result.annual} CHF`;

  const summaryLines = [
    `Language: ${locale.toUpperCase()}`,
    `Has website: ${hasSite === "yes" ? "Yes" : "No"}`,
    `Contract years: ${contractYears}`,
    `Features: ${selectedFeatures.length > 0 ? selectedFeatures.join(", ") : "None (static page)"}`,
    `Concurrent users: ${orderMode !== "none" ? result.concurrentCount || "-" : "N/A"}`,
  ];

  const emailHref = `mailto:${EMAIL}?subject=${encodeURIComponent("OrderLinks Inquiry")}&body=${encodeURIComponent(summaryLines.join("\n"))}`;
  const whatsappHref = `${WHATSAPP_LINK}?text=${encodeURIComponent(summaryLines.join("\n"))}`;

  return (
    <main className="mx-auto mt-10 max-w-7xl space-y-8 text-[#171717]">
      <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <article className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm sm:p-8">
          <h1 className="display-title text-3xl font-semibold tracking-tight sm:text-4xl">{labels.title}</h1>
          <p className="mt-3 text-[#2d2d2d]">{labels.desc}</p>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="flex flex-col">
              <label className="mb-3 block text-sm font-medium text-[#1f1f1f]">
                {hasSite === "yes" ? labels.featuresForExistingSite : labels.features}
              </label>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  className={`calc-chip ${hasReservation ? "calc-chip-active" : ""}`}
                  onClick={() => setHasReservation((prev) => !prev)}
                >
                  + {labels.reservationFeature}
                </button>
                <button
                  type="button"
                  className={`calc-chip ${hasPos ? "calc-chip-active" : ""}`}
                  onClick={() => setHasPos((prev) => !prev)}
                >
                  + {labels.posFeature}
                </button>
                <button
                  type="button"
                  className={`calc-chip ${hasQrOrder ? "calc-chip-active" : ""}`}
                  onClick={() => setHasQrOrder((prev) => !prev)}
                >
                  + {labels.qrOrderFeature}
                </button>
                <button
                  type="button"
                  className={`calc-chip ${hasTakeawayOrder ? "calc-chip-active" : ""}`}
                  onClick={() => setHasTakeawayOrder((prev) => !prev)}
                >
                  + {labels.takeawayOrderFeature}
                </button>
              </div>
              {hasSite === "yes" && selectedFeatures.length === 0 ? (
                <p className="mt-2 text-sm font-medium text-[#b42318]">{labels.existingSiteFeatureRequired}</p>
              ) : null}
            </div>

            <div className="flex flex-col">
              <label className="mb-3 block text-sm font-medium text-[#1f1f1f]">{labels.existingSite}</label>
              <div className="flex gap-2">
                <button
                  type="button"
                  className={`calc-chip ${hasSite === "yes" ? "calc-chip-active" : ""}`}
                  onClick={() => setHasSite("yes")}
                >
                  {labels.yes}
                </button>
                <button
                  type="button"
                  className={`calc-chip ${hasSite === "no" ? "calc-chip-active" : ""}`}
                  onClick={() => setHasSite("no")}
                >
                  {labels.no}
                </button>
              </div>
            </div>

            <div className="flex flex-col">
              <label htmlFor="contract" className="mb-3 block text-sm font-medium text-[#1f1f1f]">
                {labels.contract}
              </label>
              <select
                id="contract"
                className="calc-select"
                value={contractYears}
                onChange={(event) => setContractYears(Number(event.target.value) as 1 | 3)}
              >
                <option value={1}>{labels.contract1Year}</option>
                <option value={3}>{labels.contract3Years}</option>
              </select>
            </div>

            {orderMode !== "none" ? (
              <div className="flex flex-col">
                <label htmlFor="concurrent" className="mb-3 block text-sm font-medium text-[#1f1f1f]">
                  {labels.concurrentUsers}
                </label>
                <input
                  id="concurrent"
                  className="calc-select"
                  type="number"
                  inputMode="numeric"
                  min={1}
                  step={1}
                  value={concurrentInput}
                  onChange={(event) => setConcurrentInput(event.target.value)}
                />
              </div>
            ) : null}
          </div>
        </article>

        <aside className="feature-card rounded-2xl border border-black/10 bg-white p-5 shadow-sm">
          {hasSite === "yes" ? (
            <p className="text-base font-bold text-[#171717] sm:text-lg">{labels.existingSiteDiscountNote}</p>
          ) : (
            <>
              <p className="text-sm font-medium text-[#3d3d3d]">{labels.oneTimeTitle}</p>
              <p className="mt-2 text-3xl font-semibold">{result.setupFee} CHF</p>
              <p className="mt-2 text-sm text-[#2d2d2d]">{labels.oneTimeDesc}</p>
              <p className="mt-2 text-sm text-[#3f3f46]">
                <strong>{labels.oneTimeLanguageCoverage}</strong>
                {labels.oneTimeLanguageNote}
              </p>
            </>
          )}

          <div className="mt-5 space-y-2 rounded-xl border border-black/10 bg-[#fafafa] p-4">
            <p className="text-sm font-medium text-[#3d3d3d]">{labels.monthly}</p>
            <p className="text-3xl font-semibold">
              {result.isCustom ? customResultText : `${result.monthly} CHF`}
            </p>
            <p className="text-sm text-[#4a4a4a]">
              {annualDisplayText}
            </p>
          </div>

          <p className="mt-2 text-xs text-[#2d2d2d]">
            {selectedFeaturesText}
          </p>
        </aside>
      </section>

      <section className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm sm:p-8">
        <h2 className="section-title text-2xl font-semibold">{labels.contactTitle}</h2>
        <p className="mt-2 text-sm text-[#4a4a4a]">{labels.note}</p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <a
            className="group rounded-xl border border-[#121212]/15 bg-[#121212]/3 p-4 transition hover:-translate-y-0.5 hover:border-[#121212]/35 hover:bg-[#121212]/6"
            href={emailHref}
          >
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#121212] text-white">
                <svg viewBox="0 0 24 24" aria-hidden className="h-3.5 w-3.5 fill-none stroke-current">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M3.75 7.5 12 13.25 20.25 7.5" />
                  <rect x="3.75" y="5.25" width="16.5" height="13.5" rx="2.25" strokeWidth="1.8" />
                </svg>
              </span>
              <p className="text-xs font-semibold uppercase tracking-wide text-[#121212]/70">{labels.email}</p>
            </div>
            <p className="mt-2 break-all text-sm font-semibold text-[#121212] underline-offset-4 group-hover:underline">
              {EMAIL}
            </p>
          </a>
          <a
            className="group rounded-xl border border-[#121212]/15 bg-[#121212]/3 p-4 transition hover:-translate-y-0.5 hover:border-[#121212]/35 hover:bg-[#121212]/6"
            href={`tel:${PHONE_DIAL}`}
          >
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#121212] text-white">
                <svg viewBox="0 0 24 24" aria-hidden className="h-3.5 w-3.5 fill-none stroke-current">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.8"
                    d="M4.8 6.2a2 2 0 0 1 2.08-1.1l2.2.44a2 2 0 0 1 1.6 1.58l.27 1.34a2 2 0 0 1-.58 1.86l-1.06 1.06a14.2 14.2 0 0 0 4.3 4.3l1.06-1.06a2 2 0 0 1 1.86-.58l1.34.27a2 2 0 0 1 1.58 1.6l.44 2.2a2 2 0 0 1-1.1 2.08l-1.19.6c-.78.39-1.67.44-2.48.13a19.2 19.2 0 0 1-11.9-11.9 2.9 2.9 0 0 1 .13-2.48l.6-1.19Z"
                  />
                </svg>
              </span>
              <p className="text-xs font-semibold uppercase tracking-wide text-[#121212]/70">{labels.phone}</p>
            </div>
            <p className="mt-2 text-sm font-semibold text-[#121212] underline-offset-4 group-hover:underline">
              {PHONE_DISPLAY}
            </p>
          </a>
          <a
            className="group rounded-xl border border-[#121212]/15 bg-[#121212]/3 p-4 transition hover:-translate-y-0.5 hover:border-[#121212]/35 hover:bg-[#121212]/6 sm:col-span-2 lg:col-span-1"
            href={whatsappHref}
            target="_blank"
            rel="noreferrer"
          >
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#121212] text-white">
                <svg viewBox="0 0 24 24" aria-hidden className="h-3.5 w-3.5 fill-current">
                  <path d="M12 4a8 8 0 0 0-6.95 11.95L4 20l4.2-1.02A8 8 0 1 0 12 4Zm0 14.5a6.45 6.45 0 0 1-3.3-.9l-.24-.14-2.5.61.62-2.43-.16-.25A6.5 6.5 0 1 1 12 18.5Zm3.57-4.2c-.2-.1-1.16-.57-1.35-.64-.18-.06-.31-.1-.45.1-.13.2-.5.64-.61.76-.11.12-.22.14-.41.05a5.3 5.3 0 0 1-1.56-.96 5.95 5.95 0 0 1-1.1-1.37c-.11-.2-.01-.3.08-.4.09-.09.2-.22.3-.33.1-.12.13-.2.2-.34.07-.13.03-.24-.02-.34-.05-.1-.45-1.07-.61-1.47-.16-.38-.33-.33-.45-.34h-.38a.73.73 0 0 0-.53.25c-.18.2-.69.68-.69 1.66 0 .97.71 1.91.8 2.04.1.13 1.4 2.13 3.4 2.99.47.2.84.31 1.13.4.47.15.9.13 1.24.08.38-.06 1.16-.47 1.33-.92.16-.45.16-.84.11-.92-.05-.08-.18-.13-.38-.23Z" />
                </svg>
              </span>
              <p className="text-xs font-semibold uppercase tracking-wide text-[#121212]/70">{labels.whatsapp}</p>
            </div>
            <p className="mt-2 text-sm font-semibold text-[#121212] underline-offset-4 group-hover:underline">
              {PHONE_DISPLAY}
            </p>
          </a>
        </div>
        <p className="mt-3 text-sm text-[#2d2d2d]">{labels.phoneHours}</p>
      </section>

      <section className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm sm:p-8">
        <h2 className="section-title text-2xl font-semibold">{labels.processTitle}</h2>
        <p className="mt-3 leading-relaxed text-[#2d2d2d]">{labels.processDesc}</p>
      </section>
    </main>
  );
}
