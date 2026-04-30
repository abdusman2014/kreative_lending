// import { useState } from "react";
// import logo from "./assets/logo.png";

// // ─── Theme Colors ─────────────────────────────────────────────────────────────
// // Accent:     #F4522A (bold orange-red)
// // Text/BG:    #FFFFFF (white)
// // Dark BG:    #111111 (near-black)
// // Mid-dark:   #1C1C1C (card bg)
// // Border:     #2E2E2E

// // ─── Hero Banner ─────────────────────────────────────────────────────────────

// // Reset default browser body margin
// const globalStyle = document.createElement("style");
// globalStyle.textContent = `
//   *, *::before, *::after { box-sizing: border-box; }
//   html, body, #root { margin: 0; padding: 0; width: 100%; min-height: 100vh; overflow-x: hidden; }
// `;
// document.head.appendChild(globalStyle);

// function HeroBanner() {
//   return (
//     <div style={heroBannerStyles.wrap}>
//       <div style={heroBannerStyles.overlay} />
//       <div style={heroBannerStyles.content}>
//         <h1 style={heroBannerStyles.title}>
//           Get Funding For Your
//           <br />
//           Real Estate Deals
//         </h1>
//         <p style={heroBannerStyles.subtitle}>
//           Unlock fast, reliable funding for your real estate deals with Nex Gen
//           Solutions Group. Get immediate access to 100% financing for Earnest
//           Money Deposits and Double Closings, hassle-free.
//         </p>
//       </div>
//     </div>
//   );
// }

// const heroBannerStyles = {
//   wrap: {
//     position: "relative",
//     width: "100%",
//     minHeight: 420,
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     backgroundImage:
//       "url('https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1600&q=80')",
//     backgroundSize: "cover",
//     backgroundPosition: "center",
//     overflow: "hidden",
//   },
//   overlay: {
//     position: "absolute",
//     inset: 0,
//     background:
//       "linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(17,17,17,0.85) 100%)",
//   },
//   content: {
//     position: "relative",
//     zIndex: 1,
//     textAlign: "center",
//     padding: "60px 24px",
//     maxWidth: 780,
//   },
//   title: {
//     fontSize: "clamp(32px, 5vw, 58px)",
//     fontWeight: 800,
//     color: "#ffffff",
//     lineHeight: 1.15,
//     marginBottom: 20,
//     letterSpacing: "-0.5px",
//     textShadow: "0 2px 20px rgba(0,0,0,0.5)",
//   },
//   subtitle: {
//     fontSize: "clamp(14px, 1.8vw, 17px)",
//     color: "rgba(255,255,255,0.8)",
//     lineHeight: 1.7,
//     maxWidth: 600,
//     margin: "0 auto",
//   },
// };

// // ─── Steps ────────────────────────────────────────────────────────────────────

// const STEPS = [
//   { id: 1, label: "Loan Programs" },
//   { id: 2, label: "Property Information" },
// ];

// const TOTAL_STEPS = 2;
// const progressPct = { 1: 50, 2: 100 };

// // ─── Reusable field components ───────────────────────────────────────────────

// function Label({ children, required }) {
//   return (
//     <label style={styles.label}>
//       {children}
//       {required && <span style={styles.required}> *</span>}
//     </label>
//   );
// }

// function Input({ label, required, hint, ...props }) {
//   return (
//     <div style={styles.fieldWrap}>
//       {label && <Label required={required}>{label}</Label>}
//       {hint && <div style={styles.hint}>{hint}</div>}
//       <input style={styles.input} {...props} />
//     </div>
//   );
// }

// function Select({ label, required, hint, options, ...props }) {
//   return (
//     <div style={styles.fieldWrap}>
//       {label && <Label required={required}>{label}</Label>}
//       {hint && <div style={styles.hint}>{hint}</div>}
//       <select style={styles.select} {...props}>
//         <option value=""></option>
//         {options.map((o) =>
//           typeof o === "string" ? (
//             <option key={o} value={o}>
//               {o}
//             </option>
//           ) : (
//             <option key={o.value} value={o.value}>
//               {o.label}
//             </option>
//           )
//         )}
//       </select>
//     </div>
//   );
// }

// function RadioGroup({ label, required, hint, options, name, value, onChange }) {
//   return (
//     <div style={styles.fieldWrap}>
//       {label && <Label required={required}>{label}</Label>}
//       {hint && <div style={styles.hint}>{hint}</div>}
//       <div style={styles.radioGroup}>
//         {options.map((o) => {
//           const val = typeof o === "string" ? o : o.value;
//           const lbl = typeof o === "string" ? o : o.label;
//           const checked = value === val;
//           return (
//             <label
//               key={val}
//               style={{
//                 ...styles.radioLabel,
//                 ...(checked ? styles.radioLabelChecked : {}),
//               }}
//             >
//               <input
//                 type="radio"
//                 name={name}
//                 value={val}
//                 checked={checked}
//                 onChange={() => onChange(val)}
//                 style={styles.radioInput}
//               />
//               {lbl}
//             </label>
//           );
//         })}
//       </div>
//     </div>
//   );
// }

// function CheckGroup({
//   label,
//   required,
//   hint,
//   options,
//   name,
//   value = [],
//   onChange,
// }) {
//   const toggle = (val) => {
//     if (value.includes(val)) onChange(value.filter((v) => v !== val));
//     else onChange([...value, val]);
//   };
//   return (
//     <div style={styles.fieldWrap}>
//       {label && <Label required={required}>{label}</Label>}
//       {hint && <div style={styles.hint}>{hint}</div>}
//       <div style={styles.radioGroup}>
//         {options.map((o) => {
//           const val = typeof o === "string" ? o : o.value;
//           const lbl = typeof o === "string" ? o : o.label;
//           const checked = value.includes(val);
//           return (
//             <label
//               key={val}
//               style={{
//                 ...styles.radioLabel,
//                 ...(checked ? styles.radioLabelChecked : {}),
//               }}
//             >
//               <input
//                 type="checkbox"
//                 checked={checked}
//                 onChange={() => toggle(val)}
//                 style={styles.radioInput}
//               />
//               {lbl}
//             </label>
//           );
//         })}
//       </div>
//     </div>
//   );
// }

// function Textarea({ label, required, hint, ...props }) {
//   return (
//     <div style={styles.fieldWrap}>
//       {label && <Label required={required}>{label}</Label>}
//       {hint && <div style={styles.hint}>{hint}</div>}
//       <textarea
//         style={{ ...styles.input, minHeight: 90, resize: "vertical" }}
//         {...props}
//       />
//     </div>
//   );
// }

// function Row({ children, cols = 2 }) {
//   return (
//     <div
//       style={{
//         display: "grid",
//         gridTemplateColumns: `repeat(${cols}, 1fr)`,
//         gap: "0 20px",
//       }}
//     >
//       {children}
//     </div>
//   );
// }

// function SectionTitle({ children }) {
//   return <h3 style={styles.sectionTitle}>{children}</h3>;
// }

// // ─── Steps ───────────────────────────────────────────────────────────────────

// function Step1({ data, set }) {
//   const loanProduct = data.loanProduct || "";
//   const showGround = loanProduct === "Ground Up Construction";
//   const showDSCR = loanProduct === "DSCR Rental Loan";

//   const isPurchase =
//     data.purchaseOrRefi === "Purchase - Currently under contract" ||
//     data.purchaseOrRefi === "Purchase - Not Under Contract Yet";
//   const isRefi = data.purchaseOrRefi === "Refinance - I already own";
//   const isRenovation = data.isRenovation === "Yes";

//   return (
//     <div>
//       <SectionTitle>Loan Program</SectionTitle>
//       {/* 
//       <Row>
//         <Select
//           label="Are you a Borrower, Broker, Connector, or Wholesaler?"
//           required
//           options={[
//             { value: "Existing Account", label: "Existing Account (Previously Submitted a Deal)" },
//             { value: "No", label: "Yes - Borrower" },
//             "Yes - Broker",
//             "Yes - Connector",
//             "Yes - Wholesaler",
//             "Yes - Transaction Coordinator",
//             "Yes - Transactional Lender",
//             "Yes - Gap Funder",
//           ]}
//           value={data.role || ""}
//           onChange={(e) => set("role", e.target.value)}
//         />
//         <Input
//           label="Target Close Date"
//           required
//           hint="Close date is dependent on the third party's ability to accommodate"
//           type="date"
//           value={data.closeDate || ""}
//           onChange={(e) => set("closeDate", e.target.value)}
//         />
//       </Row> */}

//       <Row>
//         <div style={styles.fieldWrap}>
//           <Label required>Your Name</Label>
//           <div
//             style={{
//               display: "grid",
//               gridTemplateColumns: "1fr 1fr",
//               gap: "0 12px",
//             }}
//           >
//             <input
//               style={styles.input}
//               placeholder="First Name"
//               value={data.firstName || ""}
//               onChange={(e) => set("firstName", e.target.value)}
//             />
//             <input
//               style={styles.input}
//               placeholder="Last Name"
//               value={data.lastName || ""}
//               onChange={(e) => set("lastName", e.target.value)}
//             />
//           </div>
//         </div>

//         <Input
//           label="Target Close Date"
//           required
//           // hint="Close date is dependent on the third party's ability to accommodate"
//           type="date"
//           value={data.closeDate || ""}
//           onChange={(e) => set("closeDate", e.target.value)}
//         />
//       </Row>
//       <Row>
//         <Input
//           label="Email"
//           required
//           type="email"
//           value={data.email || ""}
//           onChange={(e) => set("email", e.target.value)}
//         />
//         <Input
//           label="Phone Number"
//           required
//           type="tel"
//           value={data.phone || ""}
//           onChange={(e) => set("phone", e.target.value)}
//         />
//       </Row>
//       <Row>
//         <Select
//           label="Loan Product"
//           required
//           options={[
//             "Fix & Flip | Fix2Rent",
//             "Bridge Loan",
//             "DSCR Rental Loan",
//             "Ground Up Construction",
//             "Commercial Loan",
//             "Conventional",
//             "FHA",
//             "USDA",
//             "VA",
//             "Reverse Mortgage",
//           ]}
//           value={loanProduct}
//           onChange={(e) => set("loanProduct", e.target.value)}
//         />

//         {showGround && (
//           <Select
//             label="How many ground up experiences completed?"
//             required
//             options={[
//               "1-2 Properties",
//               "3 Properties",
//               "4 Properties",
//               "5 Properties",
//               "6 Properties",
//               "7 Properties",
//               "8 Properties",
//               "9 Properties",
//               "Other",
//             ]}
//             value={data.groundUpExp || ""}
//             onChange={(e) => set("groundUpExp", e.target.value)}
//           />
//         )}

//         <Select
//           label="Desired Leverage"
//           required
//           hint={showDSCR ? "*DSCR - Maximum is 85%" : undefined}
//           options={[
//             "100%",
//             "96-99%",
//             "91-95%",
//             "86-90%",
//             "81-85%",
//             "76-80%",
//             "71-75%",
//             "66-70%",
//             "60-65%",
//           ]}
//           value={data.leverage || ""}
//           onChange={(e) => set("leverage", e.target.value)}
//         />
//       </Row>
//       <RadioGroup
//         label="Is this a Purchase or Refinance?"
//         required
//         name="purchaseOrRefi"
//         options={[
//           "Purchase - Currently under contract",
//           "Purchase - Not Under Contract Yet",
//           "Refinance - I already own",
//         ]}
//         value={data.purchaseOrRefi || ""}
//         onChange={(v) => set("purchaseOrRefi", v)}
//       />

//       {isPurchase && (
//         <>
//           <Input
//             label="What is the Purchase Price?"
//             required
//             type="text"
//             value={data.purchasePrice || ""}
//             onChange={(e) => set("purchasePrice", e.target.value)}
//           />
//           <RadioGroup
//             label="Is this a renovation project?"
//             required
//             name="isRenovation"
//             options={["No", "Yes"]}
//             value={data.isRenovation || ""}
//             onChange={(v) => set("isRenovation", v)}
//           />
//           {isRenovation && (
//             <Input
//               label="Rehab Budget"
//               required
//               hint="Budget included in the loan amount"
//               type="text"
//               value={data.rehabBudget || ""}
//               onChange={(e) => set("rehabBudget", e.target.value)}
//             />
//           )}
//           {showGround && (
//             <Input
//               label="Construction Budget"
//               required
//               hint="Budget included in the loan amount"
//               type="text"
//               value={data.constructionBudget || ""}
//               onChange={(e) => set("constructionBudget", e.target.value)}
//             />
//           )}
//         </>
//       )}

//       {isRefi && (
//         <>
//           <Select
//             label="Loan Purpose"
//             required
//             options={[
//               "Delayed Purchase",
//               "Cash-Out Refinance",
//               "Rate & Term Refinance",
//               "Mid-Construction Refinance",
//             ]}
//             value={data.loanPurpose || ""}
//             onChange={(e) => set("loanPurpose", e.target.value)}
//           />
//           <Input
//             label="What was the Original Purchase Price?"
//             required
//             type="text"
//             value={data.originalPurchasePrice || ""}
//             onChange={(e) => set("originalPurchasePrice", e.target.value)}
//           />
//           <Input
//             label="When was the Property Originally Purchased?"
//             required
//             type="date"
//             value={data.originalPurchaseDate || ""}
//             onChange={(e) => set("originalPurchaseDate", e.target.value)}
//           />
//           <RadioGroup
//             label="Has Work Already Been Completed?"
//             required
//             name="workCompleted"
//             options={["Yes", "No"]}
//             value={data.workCompleted || ""}
//             onChange={(v) => set("workCompleted", v)}
//           />
//           {data.workCompleted === "Yes" && (
//             <Input
//               label="Rehab Amount Completed ($)"
//               required
//               type="text"
//               value={data.rehabCompleted || ""}
//               onChange={(e) => set("rehabCompleted", e.target.value)}
//             />
//           )}
//           <Select
//             label="Are there Any Liens on the Property?"
//             required
//             options={[
//               "Yes - 1 lien",
//               "Yes - More than 1 lien",
//               "No - Owned Free and Clear",
//             ]}
//             value={data.liens || ""}
//             onChange={(e) => set("liens", e.target.value)}
//           />
//           {data.liens && data.liens !== "No - Owned Free and Clear" && (
//             <>
//               <Input
//                 label="Total Lien Balances on the Property"
//                 required
//                 type="text"
//                 value={data.lienBalances || ""}
//                 onChange={(e) => set("lienBalances", e.target.value)}
//               />
//               <Input
//                 label="First Lien Monthly Payment (P&I only):"
//                 required
//                 type="text"
//                 value={data.firstLienPayment || ""}
//                 onChange={(e) => set("firstLienPayment", e.target.value)}
//               />
//             </>
//           )}
//           <Input
//             label="Loan Amount Being Requested"
//             required
//             type="text"
//             value={data.loanAmount || ""}
//             onChange={(e) => set("loanAmount", e.target.value)}
//           />
//         </>
//       )}

//       {showGround && (
//         <>
//           <RadioGroup
//             label="Is this a full tear-down?"
//             name="tearDown"
//             options={["Yes", "No – Already demolished"]}
//             value={data.tearDown || ""}
//             onChange={(v) => set("tearDown", v)}
//           />
//           <RadioGroup
//             label="Shovel-ready?"
//             name="shovelReady"
//             options={["Yes – Ready to build", "No – Not ready yet"]}
//             value={data.shovelReady || ""}
//             onChange={(v) => set("shovelReady", v)}
//           />
//           <RadioGroup
//             label="Permit status:"
//             name="permitStatus"
//             options={["Approved", "Applied", "Not started"]}
//             value={data.permitStatus || ""}
//             onChange={(v) => set("permitStatus", v)}
//           />
//           <RadioGroup
//             label="Expansion or change of use?"
//             required
//             name="changeOfUse"
//             options={["Yes", "No"]}
//             value={data.changeOfUse || ""}
//             onChange={(v) => set("changeOfUse", v)}
//           />
//           <CheckGroup
//             label="Are any of the following happening?"
//             required
//             options={[
//               "Expanding the square footage (Horizontally)",
//               "Expanding the square footage (Vertically)",
//               "Expanding the square footage (Horizontally & Vertically)",
//               "Changing the unit count",
//               "Converting to Condominiums",
//               "Adding or converting to an ADU (Accessory Dwelling Unit)",
//               "Repairing fire damage",
//             ]}
//             name="groundUpChanges"
//             value={data.groundUpChanges || []}
//             onChange={(v) => set("groundUpChanges", v)}
//           />
//           <RadioGroup
//             label="Need Gap Funding (2nd position to cover down payment or costs)?"
//             name="gapFunding"
//             options={["Yes", "No"]}
//             value={data.gapFunding || ""}
//             onChange={(v) => set("gapFunding", v)}
//           />
//           <RadioGroup
//             label="Is this a Morby Method?"
//             name="morbyMethod"
//             options={["Yes", "No"]}
//             value={data.morbyMethod || ""}
//             onChange={(v) => set("morbyMethod", v)}
//           />
//         </>
//       )}
//     </div>
//   );
// }

// function Step2({ data, set }) {
//   const showOther = data.propertyType === "Other Commercial";
//   const showUnits = ["Multifamily (5+ Units)", "Commercial 5-9 units"].includes(
//     data.propertyType
//   );

//   return (
//     <div>
//       <SectionTitle>Property Information</SectionTitle>

//       <Input
//         label="Subject Property Address"
//         required
//         hint="*We do NOT currently Lend in the following States: Arizona, Nevada, North Dakota, Oregon, South Dakota, Utah, Vermont."
//         placeholder="Full Address"
//         value={data.propertyAddress || ""}
//         onChange={(e) => set("propertyAddress", e.target.value)}
//       />

//       <Select
//         label="Property Type"
//         required
//         options={[
//           "Single-Family Residential (SFR)",
//           "Duplex (2-Unit Residential)",
//           "Triplex (3-Unit Residential)",
//           "Quadplex (4-Unit Residential)",
//           "Multifamily (5+ Units)",
//           "Commercial 5-9 units",
//           "Condominium (Warrantable)",
//           "Townhouse",
//           "Mixed Use",
//           "Manufactured Home",
//           "Planned Unit Development",
//           "Other Commercial",
//         ]}
//         value={data.propertyType || ""}
//         onChange={(e) => set("propertyType", e.target.value)}
//       />

//       {showOther && (
//         <Input
//           label="Please specify the property type"
//           value={data.propertyTypeOther || ""}
//           onChange={(e) => set("propertyTypeOther", e.target.value)}
//         />
//       )}

//       {showUnits && (
//         <Input
//           label="How many Units?"
//           required
//           type="text"
//           hint="Multifamily up to 9 units"
//           value={data.unitCount || ""}
//           onChange={(e) => set("unitCount", e.target.value)}
//         />
//       )}

//       <RadioGroup
//         label="Is there a Homeowner's Association?"
//         name="hasHOA"
//         options={["Yes", "No"]}
//         value={data.hasHOA || ""}
//         onChange={(v) => set("hasHOA", v)}
//       />
//     </div>
//   );
// }

// function Step3({ data, set }) {
//   return (
//     <div>
//       <SectionTitle>Borrower/Guarantor Information</SectionTitle>

//       <Row>
//         <div style={styles.fieldWrap}>
//           <Label required>Borrower's Full Name</Label>
//           <div
//             style={{
//               display: "grid",
//               gridTemplateColumns: "1fr 1fr",
//               gap: "0 12px",
//             }}
//           >
//             <input
//               style={styles.input}
//               placeholder="First"
//               value={data.borrowerFirst || ""}
//               onChange={(e) => set("borrowerFirst", e.target.value)}
//             />
//             <input
//               style={styles.input}
//               placeholder="Last"
//               value={data.borrowerLast || ""}
//               onChange={(e) => set("borrowerLast", e.target.value)}
//             />
//           </div>
//         </div>
//         <Input
//           label="Phone No."
//           required
//           type="tel"
//           value={data.borrowerPhone || ""}
//           onChange={(e) => set("borrowerPhone", e.target.value)}
//         />
//       </Row>

//       <Input
//         label="Email Address"
//         required
//         type="email"
//         value={data.borrowerEmail || ""}
//         onChange={(e) => set("borrowerEmail", e.target.value)}
//       />
//     </div>
//   );
// }

// // ─── Main App ─────────────────────────────────────────────────────────────────

// export default function KreativeLending() {
//   const [step, setStep] = useState(1);
//   const [formData, setFormData] = useState({});
//   const [submitted, setSubmitted] = useState(false);

//   const setField = (key, val) => setFormData((d) => ({ ...d, [key]: val }));
//   const pct = progressPct[step];

//   const next = () => {
//     if (step < TOTAL_STEPS) setStep((s) => s + 1);
//     else setSubmitted(true);
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   const prev = () => {
//     if (step > 1) setStep((s) => s - 1);
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   if (submitted) {
//     return (
//       <div style={styles.page}>
//         <div style={styles.header}>
//           <img
//             src={logo}
//             alt="Kreative Lending"
//             style={styles.logo}
//           />
//         </div>
//         <div style={styles.container}>
//           <div
//             style={{
//               ...styles.card,
//               textAlign: "center",
//               padding: "60px 20px",
//             }}
//           >
//             <div style={{ fontSize: 56, marginBottom: 16 }}>✅</div>
//             <h2
//               style={{
//                 fontSize: 26,
//                 color: "#ffffff",
//                 marginBottom: 12,
//                 fontWeight: 700,
//               }}
//             >
//               Application Submitted!
//             </h2>
//             <p
//               style={{
//                 color: "#aaa",
//                 fontSize: 15,
//                 maxWidth: 400,
//                 margin: "0 auto",
//                 lineHeight: 1.6,
//               }}
//             >
//               Thank you for submitting your loan application. Our team will
//               review it and reach out to you shortly.
//             </p>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div style={styles.page}>
//       {/* Hero Banner */}
//       <HeroBanner />

//       {/* Header */}
//       <div style={styles.header}>
//         <img
//           src={logo}
//           alt="Kreative Lending"
//           style={styles.logo}
//         />
//       </div>

//       <div style={styles.container}>
//         {/* Progress bar */}
//         <div style={styles.progressWrap}>
//           <div style={styles.progressLabel}>
//             Step <strong style={{ color: "#F4522A" }}>{step}</strong> of{" "}
//             <strong style={{ color: "#fff" }}>{TOTAL_STEPS}</strong>
//             <span style={styles.progressStepName}>
//               {" "}
//               — {STEPS[step - 1].label}
//             </span>
//           </div>
//           <div style={styles.progressBarOuter}>
//             <div style={{ ...styles.progressBarInner, width: `${pct}%` }} />
//           </div>
//         </div>

//         {/* Step nav pills */}
//         <div style={styles.stepNav}>
//           {STEPS.map((s) => (
//             <div
//               key={s.id}
//               style={{
//                 ...styles.stepPill,
//                 ...(step === s.id ? styles.stepPillActive : {}),
//                 ...(step > s.id ? styles.stepPillDone : {}),
//               }}
//             >
//               <span
//                 style={{
//                   ...styles.stepPillNum,
//                   background:
//                     step === s.id
//                       ? "#F4522A"
//                       : step > s.id
//                       ? "#F4522A"
//                       : "#2E2E2E",
//                   color: "#fff",
//                 }}
//               >
//                 {step > s.id ? "✓" : s.id}
//               </span>
//               <span style={styles.stepPillLabel}>{s.label}</span>
//             </div>
//           ))}
//         </div>

//         {/* Form card */}
//         <div style={styles.card}>
//           {step === 1 && <Step1 data={formData} set={setField} />}
//           {step === 2 && <Step2 data={formData} set={setField} />}

//           {/* Navigation buttons */}
//           <div style={styles.navButtons}>
//             {step > 1 && (
//               <button onClick={prev} style={styles.btnPrev}>
//                 ← Previous
//               </button>
//             )}
//             <button
//               onClick={next}
//               style={step < TOTAL_STEPS ? styles.btnNext : styles.btnSubmit}
//             >
//               {step < TOTAL_STEPS ? "Next →" : "Submit Loan Application"}
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// // ─── Styles ───────────────────────────────────────────────────────────────────

// const styles = {
//   page: {
//     minHeight: "100vh",
//     width: "100%",
//     margin: 0,
//     padding: 0,
//     background: "#111111",
//     fontFamily: "'Segoe UI', system-ui, -apple-system, sans-serif",
//     color: "#ffffff",
//   },
//   header: {
//     background: "#0a0a0a",
//     padding: "16px 32px",
//     display: "flex",
//     alignItems: "center",
//     borderBottom: "1px solid #2E2E2E",
//     boxShadow: "0 2px 20px rgba(0,0,0,0.6)",
//   },
//   logo: {
//     height: 50,
//     objectFit: "contain",
//   },
//   container: {
//     width: "75%",
//     margin: "0 auto",
//     padding: "32px 0 60px",
//   },
//   progressWrap: {
//     marginBottom: 28,
//   },
//   progressLabel: {
//     fontSize: 14,
//     color: "#888",
//     marginBottom: 10,
//     letterSpacing: 0.2,
//   },
//   progressStepName: {
//     color: "#ffffff",
//     fontWeight: 600,
//   },
//   progressBarOuter: {
//     background: "#2E2E2E",
//     borderRadius: 8,
//     height: 6,
//     overflow: "hidden",
//   },
//   progressBarInner: {
//     background: "linear-gradient(90deg, #F4522A 0%, #ff7a50 100%)",
//     height: "100%",
//     borderRadius: 8,
//     transition: "width 0.4s ease",
//     boxShadow: "0 0 10px rgba(244,82,42,0.5)",
//   },
//   stepNav: {
//     display: "flex",
//     gap: 8,
//     marginBottom: 24,
//     flexWrap: "wrap",
//   },
//   stepPill: {
//     display: "flex",
//     alignItems: "center",
//     gap: 7,
//     padding: "6px 14px",
//     borderRadius: 20,
//     background: "#1C1C1C",
//     border: "1px solid #2E2E2E",
//     color: "#666",
//     fontSize: 13,
//     fontWeight: 500,
//     transition: "all 0.2s",
//   },
//   stepPillActive: {
//     background: "#1C1C1C",
//     border: "1px solid #F4522A",
//     color: "#ffffff",
//   },
//   stepPillDone: {
//     background: "#1C1C1C",
//     border: "1px solid #F4522A",
//     color: "#F4522A",
//   },
//   stepPillNum: {
//     width: 20,
//     height: 20,
//     borderRadius: "50%",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     fontSize: 11,
//     fontWeight: 700,
//     flexShrink: 0,
//   },
//   stepPillLabel: {
//     whiteSpace: "nowrap",
//   },
//   card: {
//     background: "#1C1C1C",
//     borderRadius: 12,
//     padding: "36px 40px",
//     border: "1px solid #2E2E2E",
//     boxShadow: "0 8px 40px rgba(0,0,0,0.5)",
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: 700,
//     color: "#ffffff",
//     marginBottom: 20,
//     marginTop: 8,
//     paddingBottom: 12,
//     borderBottom: "2px solid #F4522A",
//     letterSpacing: 0.3,
//   },
//   fieldWrap: {
//     marginBottom: 18,
//   },
//   label: {
//     display: "block",
//     fontSize: 13,
//     fontWeight: 600,
//     color: "#cccccc",
//     marginBottom: 6,
//     letterSpacing: 0.2,
//     textTransform: "uppercase",
//   },
//   required: {
//     color: "#F4522A",
//   },
//   hint: {
//     fontSize: 12,
//     color: "#666",
//     marginBottom: 5,
//     fontStyle: "italic",
//     lineHeight: 1.4,
//   },
//   input: {
//     width: "100%",
//     padding: "10px 14px",
//     border: "1px solid #2E2E2E",
//     borderRadius: 6,
//     fontSize: 14,
//     color: "#ffffff",
//     background: "#111111",
//     outline: "none",
//     boxSizing: "border-box",
//     transition: "border-color 0.2s",
//     colorScheme: "dark",
//   },
//   select: {
//     width: "100%",
//     padding: "10px 14px",
//     border: "1px solid #2E2E2E",
//     borderRadius: 6,
//     fontSize: 14,
//     color: "#ffffff",
//     background: "#111111",
//     outline: "none",
//     boxSizing: "border-box",
//     cursor: "pointer",
//     appearance: "auto",
//     colorScheme: "dark",
//   },
//   radioGroup: {
//     display: "flex",
//     flexDirection: "column",
//     gap: 8,
//   },
//   radioLabel: {
//     display: "flex",
//     alignItems: "center",
//     gap: 10,
//     fontSize: 14,
//     color: "#cccccc",
//     cursor: "pointer",
//     padding: "8px 12px",
//     borderRadius: 6,
//     border: "1px solid #2E2E2E",
//     background: "#111111",
//     transition: "border-color 0.15s, color 0.15s",
//   },
//   radioLabelChecked: {
//     borderColor: "#F4522A",
//     color: "#ffffff",
//     background: "rgba(244,82,42,0.08)",
//   },
//   radioInput: {
//     accentColor: "#F4522A",
//     width: 15,
//     height: 15,
//     flexShrink: 0,
//     cursor: "pointer",
//   },
//   navButtons: {
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginTop: 32,
//     paddingTop: 20,
//     borderTop: "1px solid #2E2E2E",
//   },
//   btnPrev: {
//     padding: "11px 24px",
//     background: "transparent",
//     border: "2px solid #2E2E2E",
//     borderRadius: 7,
//     fontSize: 14,
//     fontWeight: 600,
//     color: "#aaa",
//     cursor: "pointer",
//     transition: "border-color 0.2s, color 0.2s",
//   },
//   btnNext: {
//     marginLeft: "auto",
//     padding: "11px 32px",
//     background: "#F4522A",
//     border: "none",
//     borderRadius: 7,
//     fontSize: 14,
//     fontWeight: 700,
//     color: "#ffffff",
//     cursor: "pointer",
//     letterSpacing: 0.3,
//     boxShadow: "0 4px 16px rgba(244,82,42,0.35)",
//     transition: "opacity 0.2s",
//   },
//   btnSubmit: {
//     marginLeft: "auto",
//     padding: "12px 36px",
//     background: "#F4522A",
//     border: "none",
//     borderRadius: 7,
//     fontSize: 15,
//     fontWeight: 700,
//     color: "#ffffff",
//     cursor: "pointer",
//     letterSpacing: 0.5,
//     boxShadow: "0 4px 20px rgba(244,82,42,0.45)",
//   },
// };

import { useState } from "react";
import logo from "./assets/logo.png";

// ─── Theme Colors ─────────────────────────────────────────────────────────────
// Accent:     #F4522A (bold orange-red)
// Text/BG:    #FFFFFF (white)
// Dark BG:    #111111 (near-black)
// Mid-dark:   #1C1C1C (card bg)
// Border:     #2E2E2E

// ─── Hero Banner ─────────────────────────────────────────────────────────────

const globalStyle = document.createElement("style");
globalStyle.textContent = `
  *, *::before, *::after { box-sizing: border-box; }
  html, body, #root { margin: 0; padding: 0; width: 100%; min-height: 100vh; overflow-x: hidden; }
`;
document.head.appendChild(globalStyle);

function HeroBanner() {
  return (
    <div style={heroBannerStyles.wrap}>
      <div style={heroBannerStyles.overlay} />
      <div style={heroBannerStyles.content}>
        <h1 style={heroBannerStyles.title}>
          Get Funding For Your
          <br />
          Real Estate Deals
        </h1>
        <p style={heroBannerStyles.subtitle}>
          Unlock fast, reliable funding for your real estate deals with Nex Gen
          Solutions Group. Get immediate access to 100% financing for Earnest
          Money Deposits and Double Closings, hassle-free.
        </p>
      </div>
    </div>
  );
}

const heroBannerStyles = {
  wrap: {
    position: "relative",
    width: "100%",
    minHeight: 420,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundImage:
      "url('https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1600&q=80')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    overflow: "hidden",
  },
  overlay: {
    position: "absolute",
    inset: 0,
    background:
      "linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(17,17,17,0.85) 100%)",
  },
  content: {
    position: "relative",
    zIndex: 1,
    textAlign: "center",
    padding: "60px 24px",
    maxWidth: 780,
  },
  title: {
    fontSize: "clamp(32px, 5vw, 58px)",
    fontWeight: 800,
    color: "#ffffff",
    lineHeight: 1.15,
    marginBottom: 20,
    letterSpacing: "-0.5px",
    textShadow: "0 2px 20px rgba(0,0,0,0.5)",
  },
  subtitle: {
    fontSize: "clamp(14px, 1.8vw, 17px)",
    color: "rgba(255,255,255,0.8)",
    lineHeight: 1.7,
    maxWidth: 600,
    margin: "0 auto",
  },
};

// ─── Steps ────────────────────────────────────────────────────────────────────

const STEPS = [
  { id: 1, label: "Loan Programs" },
  { id: 2, label: "Property Information" },
];

const TOTAL_STEPS = 2;
const progressPct = { 1: 50, 2: 100 };

// ─── Reusable field components ───────────────────────────────────────────────

function Label({ children, required }) {
  return (
    <label style={styles.label}>
      {children}
      {required && <span style={styles.required}> *</span>}
    </label>
  );
}

function Input({ label, required, hint, ...props }) {
  return (
    <div style={styles.fieldWrap}>
      {label && <Label required={required}>{label}</Label>}
      {hint && <div style={styles.hint}>{hint}</div>}
      <input style={styles.input} {...props} />
    </div>
  );
}

function Select({ label, required, hint, options, ...props }) {
  return (
    <div style={styles.fieldWrap}>
      {label && <Label required={required}>{label}</Label>}
      {hint && <div style={styles.hint}>{hint}</div>}
      <select style={styles.select} {...props}>
        <option value=""></option>
        {options.map((o) =>
          typeof o === "string" ? (
            <option key={o} value={o}>
              {o}
            </option>
          ) : (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          )
        )}
      </select>
    </div>
  );
}

function RadioGroup({ label, required, hint, options, name, value, onChange }) {
  return (
    <div style={styles.fieldWrap}>
      {label && <Label required={required}>{label}</Label>}
      {hint && <div style={styles.hint}>{hint}</div>}
      <div style={styles.radioGroup}>
        {options.map((o) => {
          const val = typeof o === "string" ? o : o.value;
          const lbl = typeof o === "string" ? o : o.label;
          const checked = value === val;
          return (
            <label
              key={val}
              style={{
                ...styles.radioLabel,
                ...(checked ? styles.radioLabelChecked : {}),
              }}
            >
              <input
                type="radio"
                name={name}
                value={val}
                checked={checked}
                onChange={() => onChange(val)}
                style={styles.radioInput}
              />
              {lbl}
            </label>
          );
        })}
      </div>
    </div>
  );
}

function CheckGroup({ label, required, hint, options, name, value = [], onChange }) {
  const toggle = (val) => {
    if (value.includes(val)) onChange(value.filter((v) => v !== val));
    else onChange([...value, val]);
  };
  return (
    <div style={styles.fieldWrap}>
      {label && <Label required={required}>{label}</Label>}
      {hint && <div style={styles.hint}>{hint}</div>}
      <div style={styles.radioGroup}>
        {options.map((o) => {
          const val = typeof o === "string" ? o : o.value;
          const lbl = typeof o === "string" ? o : o.label;
          const checked = value.includes(val);
          return (
            <label
              key={val}
              style={{
                ...styles.radioLabel,
                ...(checked ? styles.radioLabelChecked : {}),
              }}
            >
              <input
                type="checkbox"
                checked={checked}
                onChange={() => toggle(val)}
                style={styles.radioInput}
              />
              {lbl}
            </label>
          );
        })}
      </div>
    </div>
  );
}

function Row({ children, cols = 2 }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gap: "0 20px",
      }}
    >
      {children}
    </div>
  );
}

function SectionTitle({ children }) {
  return <h3 style={styles.sectionTitle}>{children}</h3>;
}

// ─── Steps ───────────────────────────────────────────────────────────────────

function Step1({ data, set }) {
  const loanProduct = data.loanProduct || "";
  const showGround = loanProduct === "Ground Up Construction";
  const showDSCR = loanProduct === "DSCR Rental Loan";

  const isPurchase =
    data.purchaseOrRefi === "Purchase - Currently under contract" ||
    data.purchaseOrRefi === "Purchase - Not Under Contract Yet";
  const isRefi = data.purchaseOrRefi === "Refinance - I already own";
  const isRenovation = data.isRenovation === "Yes";

  return (
    <div>
      <SectionTitle>Loan Program</SectionTitle>

      <Row>
        <div style={styles.fieldWrap}>
          <Label required>Your Name</Label>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 12px" }}>
            <input
              style={styles.input}
              placeholder="First Name"
              value={data.firstName || ""}
              onChange={(e) => set("firstName", e.target.value)}
            />
            <input
              style={styles.input}
              placeholder="Last Name"
              value={data.lastName || ""}
              onChange={(e) => set("lastName", e.target.value)}
            />
          </div>
        </div>

        <Input
          label="Target Close Date"
          required
          type="date"
          value={data.closeDate || ""}
          onChange={(e) => set("closeDate", e.target.value)}
        />
      </Row>

      <Row>
        <Input
          label="Email"
          required
          type="email"
          value={data.email || ""}
          onChange={(e) => set("email", e.target.value)}
        />
        <Input
          label="Phone Number"
          required
          type="tel"
          value={data.phone || ""}
          onChange={(e) => set("phone", e.target.value)}
        />
      </Row>

      <Row>
        <Select
          label="Loan Product"
          required
          options={[
            "Fix & Flip | Fix2Rent",
            "Bridge Loan",
            "DSCR Rental Loan",
            "Ground Up Construction",
            "Commercial Loan",
            "Conventional",
            "FHA",
            "USDA",
            "VA",
            "Reverse Mortgage",
          ]}
          value={loanProduct}
          onChange={(e) => set("loanProduct", e.target.value)}
        />

        {showGround && (
          <Select
            label="How many ground up experiences completed?"
            required
            options={[
              "1-2 Properties","3 Properties","4 Properties","5 Properties",
              "6 Properties","7 Properties","8 Properties","9 Properties","Other",
            ]}
            value={data.groundUpExp || ""}
            onChange={(e) => set("groundUpExp", e.target.value)}
          />
        )}

        <Select
          label="Desired Leverage"
          required
          hint={showDSCR ? "*DSCR - Maximum is 85%" : undefined}
          options={["100%","96-99%","91-95%","86-90%","81-85%","76-80%","71-75%","66-70%","60-65%"]}
          value={data.leverage || ""}
          onChange={(e) => set("leverage", e.target.value)}
        />
      </Row>

      <RadioGroup
        label="Is this a Purchase or Refinance?"
        required
        name="purchaseOrRefi"
        options={[
          "Purchase - Currently under contract",
          "Purchase - Not Under Contract Yet",
          "Refinance - I already own",
        ]}
        value={data.purchaseOrRefi || ""}
        onChange={(v) => set("purchaseOrRefi", v)}
      />

      {isPurchase && (
        <>
          <Input
            label="What is the Purchase Price?"
            required
            type="text"
            value={data.purchasePrice || ""}
            onChange={(e) => set("purchasePrice", e.target.value)}
          />
          <RadioGroup
            label="Is this a renovation project?"
            required
            name="isRenovation"
            options={["No", "Yes"]}
            value={data.isRenovation || ""}
            onChange={(v) => set("isRenovation", v)}
          />
          {isRenovation && (
            <Input
              label="Rehab Budget"
              required
              hint="Budget included in the loan amount"
              type="text"
              value={data.rehabBudget || ""}
              onChange={(e) => set("rehabBudget", e.target.value)}
            />
          )}
          {showGround && (
            <Input
              label="Construction Budget"
              required
              hint="Budget included in the loan amount"
              type="text"
              value={data.constructionBudget || ""}
              onChange={(e) => set("constructionBudget", e.target.value)}
            />
          )}
        </>
      )}

      {isRefi && (
        <>
          <Select
            label="Loan Purpose"
            required
            options={["Delayed Purchase","Cash-Out Refinance","Rate & Term Refinance","Mid-Construction Refinance"]}
            value={data.loanPurpose || ""}
            onChange={(e) => set("loanPurpose", e.target.value)}
          />
          <Input
            label="What was the Original Purchase Price?"
            required
            type="text"
            value={data.originalPurchasePrice || ""}
            onChange={(e) => set("originalPurchasePrice", e.target.value)}
          />
          <Input
            label="When was the Property Originally Purchased?"
            required
            type="date"
            value={data.originalPurchaseDate || ""}
            onChange={(e) => set("originalPurchaseDate", e.target.value)}
          />
          <RadioGroup
            label="Has Work Already Been Completed?"
            required
            name="workCompleted"
            options={["Yes", "No"]}
            value={data.workCompleted || ""}
            onChange={(v) => set("workCompleted", v)}
          />
          {data.workCompleted === "Yes" && (
            <Input
              label="Rehab Amount Completed ($)"
              required
              type="text"
              value={data.rehabCompleted || ""}
              onChange={(e) => set("rehabCompleted", e.target.value)}
            />
          )}
          <Select
            label="Are there Any Liens on the Property?"
            required
            options={["Yes - 1 lien","Yes - More than 1 lien","No - Owned Free and Clear"]}
            value={data.liens || ""}
            onChange={(e) => set("liens", e.target.value)}
          />
          {data.liens && data.liens !== "No - Owned Free and Clear" && (
            <>
              <Input
                label="Total Lien Balances on the Property"
                required
                type="text"
                value={data.lienBalances || ""}
                onChange={(e) => set("lienBalances", e.target.value)}
              />
              <Input
                label="First Lien Monthly Payment (P&I only):"
                required
                type="text"
                value={data.firstLienPayment || ""}
                onChange={(e) => set("firstLienPayment", e.target.value)}
              />
            </>
          )}
          <Input
            label="Loan Amount Being Requested"
            required
            type="text"
            value={data.loanAmount || ""}
            onChange={(e) => set("loanAmount", e.target.value)}
          />
        </>
      )}

      {showGround && (
        <>
          <RadioGroup label="Is this a full tear-down?" name="tearDown" options={["Yes","No – Already demolished"]} value={data.tearDown || ""} onChange={(v) => set("tearDown", v)} />
          <RadioGroup label="Shovel-ready?" name="shovelReady" options={["Yes – Ready to build","No – Not ready yet"]} value={data.shovelReady || ""} onChange={(v) => set("shovelReady", v)} />
          <RadioGroup label="Permit status:" name="permitStatus" options={["Approved","Applied","Not started"]} value={data.permitStatus || ""} onChange={(v) => set("permitStatus", v)} />
          <RadioGroup label="Expansion or change of use?" required name="changeOfUse" options={["Yes","No"]} value={data.changeOfUse || ""} onChange={(v) => set("changeOfUse", v)} />
          <CheckGroup
            label="Are any of the following happening?"
            required
            options={[
              "Expanding the square footage (Horizontally)",
              "Expanding the square footage (Vertically)",
              "Expanding the square footage (Horizontally & Vertically)",
              "Changing the unit count",
              "Converting to Condominiums",
              "Adding or converting to an ADU (Accessory Dwelling Unit)",
              "Repairing fire damage",
            ]}
            name="groundUpChanges"
            value={data.groundUpChanges || []}
            onChange={(v) => set("groundUpChanges", v)}
          />
          <RadioGroup label="Need Gap Funding (2nd position to cover down payment or costs)?" name="gapFunding" options={["Yes","No"]} value={data.gapFunding || ""} onChange={(v) => set("gapFunding", v)} />
          <RadioGroup label="Is this a Morby Method?" name="morbyMethod" options={["Yes","No"]} value={data.morbyMethod || ""} onChange={(v) => set("morbyMethod", v)} />
        </>
      )}
    </div>
  );
}

function Step2({ data, set }) {
  const showOther = data.propertyType === "Other Commercial";
  const showUnits = ["Multifamily (5+ Units)", "Commercial 5-9 units"].includes(data.propertyType);

  return (
    <div>
      <SectionTitle>Property Information</SectionTitle>

      <Input
        label="Subject Property Address"
        required
        hint="*We do NOT currently Lend in the following States: Arizona, Nevada, North Dakota, Oregon, South Dakota, Utah, Vermont."
        placeholder="Full Address"
        value={data.propertyAddress || ""}
        onChange={(e) => set("propertyAddress", e.target.value)}
      />

      <Select
        label="Property Type"
        required
        options={[
          "Single-Family Residential (SFR)",
          "Duplex (2-Unit Residential)",
          "Triplex (3-Unit Residential)",
          "Quadplex (4-Unit Residential)",
          "Multifamily (5+ Units)",
          "Commercial 5-9 units",
          "Condominium (Warrantable)",
          "Townhouse",
          "Mixed Use",
          "Manufactured Home",
          "Planned Unit Development",
          "Other Commercial",
        ]}
        value={data.propertyType || ""}
        onChange={(e) => set("propertyType", e.target.value)}
      />

      {showOther && (
        <Input
          label="Please specify the property type"
          value={data.propertyTypeOther || ""}
          onChange={(e) => set("propertyTypeOther", e.target.value)}
        />
      )}

      {showUnits && (
        <Input
          label="How many Units?"
          required
          type="text"
          hint="Multifamily up to 9 units"
          value={data.unitCount || ""}
          onChange={(e) => set("unitCount", e.target.value)}
        />
      )}

      <RadioGroup
        label="Is there a Homeowner's Association?"
        name="hasHOA"
        options={["Yes", "No"]}
        value={data.hasHOA || ""}
        onChange={(v) => set("hasHOA", v)}
      />
    </div>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────

const GHL_WEBHOOK_URL =
  "https://services.leadconnectorhq.com/hooks/oxJ1RfUJqldrGEadNke7/webhook-trigger/30c02964-5e98-4ac7-9a6d-3042bea28e6e";

export default function KreativeLending() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const setField = (key, val) => setFormData((d) => ({ ...d, [key]: val }));
  const pct = progressPct[step];

  const submitToGHL = async (data) => {
    const payload = {
      firstName:             data.firstName             || "",
      lastName:              data.lastName              || "",
      email:                 data.email                 || "",
      phone:                 data.phone                 || "",
      closeDate:             data.closeDate             || "",
      loanProduct:           data.loanProduct           || "",
      leverage:              data.leverage              || "",
      purchaseOrRefi:        data.purchaseOrRefi        || "",
      purchasePrice:         data.purchasePrice         || "",
      isRenovation:          data.isRenovation          || "",
      rehabBudget:           data.rehabBudget           || "",
      constructionBudget:    data.constructionBudget    || "",
      groundUpExp:           data.groundUpExp           || "",
      loanPurpose:           data.loanPurpose           || "",
      originalPurchasePrice: data.originalPurchasePrice || "",
      originalPurchaseDate:  data.originalPurchaseDate  || "",
      workCompleted:         data.workCompleted         || "",
      rehabCompleted:        data.rehabCompleted        || "",
      liens:                 data.liens                 || "",
      lienBalances:          data.lienBalances          || "",
      firstLienPayment:      data.firstLienPayment      || "",
      loanAmount:            data.loanAmount            || "",
      tearDown:              data.tearDown              || "",
      shovelReady:           data.shovelReady           || "",
      permitStatus:          data.permitStatus          || "",
      changeOfUse:           data.changeOfUse           || "",
      groundUpChanges:       (data.groundUpChanges || []).join(", "),
      gapFunding:            data.gapFunding            || "",
      morbyMethod:           data.morbyMethod           || "",
      propertyAddress:       data.propertyAddress       || "",
      propertyType:          data.propertyType          || "",
      propertyTypeOther:     data.propertyTypeOther     || "",
      unitCount:             data.unitCount             || "",
      hasHOA:                data.hasHOA                || "",
    };

    const res = await fetch(GHL_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
    return res.json();
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      await submitToGHL(formData);
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      console.error("Submission error:", err);
      alert("Something went wrong submitting your application. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const next = () => {
    if (step < TOTAL_STEPS) {
      setStep((s) => s + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      handleSubmit();
    }
  };

  const prev = () => {
    if (step > 1) setStep((s) => s - 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (submitted) {
    return (
      <div style={styles.page}>
        <div style={styles.header}>
          <img src={logo} alt="Kreative Lending" style={styles.logo} />
        </div>
        <div style={styles.container}>
          <div style={{ ...styles.card, textAlign: "center", padding: "60px 20px" }}>
            <div style={{ fontSize: 56, marginBottom: 16 }}>✅</div>
            <h2 style={{ fontSize: 26, color: "#ffffff", marginBottom: 12, fontWeight: 700 }}>
              Application Submitted!
            </h2>
            <p style={{ color: "#aaa", fontSize: 15, maxWidth: 400, margin: "0 auto", lineHeight: 1.6 }}>
              Thank you for submitting your loan application. Our team will review it and reach out to you shortly.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      {/* Hero Banner */}
      <HeroBanner />

      {/* Header */}
      <div style={styles.header}>
        <img src={logo} alt="Kreative Lending" style={styles.logo} />
      </div>

      <div style={styles.container}>
        {/* Progress bar */}
        <div style={styles.progressWrap}>
          <div style={styles.progressLabel}>
            Step <strong style={{ color: "#F4522A" }}>{step}</strong> of{" "}
            <strong style={{ color: "#fff" }}>{TOTAL_STEPS}</strong>
            <span style={styles.progressStepName}> — {STEPS[step - 1].label}</span>
          </div>
          <div style={styles.progressBarOuter}>
            <div style={{ ...styles.progressBarInner, width: `${pct}%` }} />
          </div>
        </div>

        {/* Step nav pills */}
        <div style={styles.stepNav}>
          {STEPS.map((s) => (
            <div
              key={s.id}
              style={{
                ...styles.stepPill,
                ...(step === s.id ? styles.stepPillActive : {}),
                ...(step > s.id ? styles.stepPillDone : {}),
              }}
            >
              <span
                style={{
                  ...styles.stepPillNum,
                  background: step === s.id ? "#F4522A" : step > s.id ? "#F4522A" : "#2E2E2E",
                  color: "#fff",
                }}
              >
                {step > s.id ? "✓" : s.id}
              </span>
              <span style={styles.stepPillLabel}>{s.label}</span>
            </div>
          ))}
        </div>

        {/* Form card */}
        <div style={styles.card}>
          {step === 1 && <Step1 data={formData} set={setField} />}
          {step === 2 && <Step2 data={formData} set={setField} />}

          {/* Navigation buttons */}
          <div style={styles.navButtons}>
            {step > 1 && (
              <button onClick={prev} style={styles.btnPrev}>
                ← Previous
              </button>
            )}
            <button
              onClick={next}
              disabled={submitting}
              style={{
                ...(step < TOTAL_STEPS ? styles.btnNext : styles.btnSubmit),
                ...(submitting ? { opacity: 0.7, cursor: "not-allowed" } : {}),
              }}
            >
              {step < TOTAL_STEPS
                ? "Next →"
                : submitting
                ? "Submitting..."
                : "Submit Loan Application"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = {
  page: {
    minHeight: "100vh",
    width: "100%",
    margin: 0,
    padding: 0,
    background: "#111111",
    fontFamily: "'Segoe UI', system-ui, -apple-system, sans-serif",
    color: "#ffffff",
  },
  header: {
    background: "#0a0a0a",
    padding: "16px 32px",
    display: "flex",
    alignItems: "center",
    borderBottom: "1px solid #2E2E2E",
    boxShadow: "0 2px 20px rgba(0,0,0,0.6)",
  },
  logo: {
    height: 50,
    objectFit: "contain",
  },
  container: {
    width: "75%",
    margin: "0 auto",
    padding: "32px 0 60px",
  },
  progressWrap: {
    marginBottom: 28,
  },
  progressLabel: {
    fontSize: 14,
    color: "#888",
    marginBottom: 10,
    letterSpacing: 0.2,
  },
  progressStepName: {
    color: "#ffffff",
    fontWeight: 600,
  },
  progressBarOuter: {
    background: "#2E2E2E",
    borderRadius: 8,
    height: 6,
    overflow: "hidden",
  },
  progressBarInner: {
    background: "linear-gradient(90deg, #F4522A 0%, #ff7a50 100%)",
    height: "100%",
    borderRadius: 8,
    transition: "width 0.4s ease",
    boxShadow: "0 0 10px rgba(244,82,42,0.5)",
  },
  stepNav: {
    display: "flex",
    gap: 8,
    marginBottom: 24,
    flexWrap: "wrap",
  },
  stepPill: {
    display: "flex",
    alignItems: "center",
    gap: 7,
    padding: "6px 14px",
    borderRadius: 20,
    background: "#1C1C1C",
    border: "1px solid #2E2E2E",
    color: "#666",
    fontSize: 13,
    fontWeight: 500,
    transition: "all 0.2s",
  },
  stepPillActive: {
    background: "#1C1C1C",
    border: "1px solid #F4522A",
    color: "#ffffff",
  },
  stepPillDone: {
    background: "#1C1C1C",
    border: "1px solid #F4522A",
    color: "#F4522A",
  },
  stepPillNum: {
    width: 20,
    height: 20,
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 11,
    fontWeight: 700,
    flexShrink: 0,
  },
  stepPillLabel: {
    whiteSpace: "nowrap",
  },
  card: {
    background: "#1C1C1C",
    borderRadius: 12,
    padding: "36px 40px",
    border: "1px solid #2E2E2E",
    boxShadow: "0 8px 40px rgba(0,0,0,0.5)",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 700,
    color: "#ffffff",
    marginBottom: 20,
    marginTop: 8,
    paddingBottom: 12,
    borderBottom: "2px solid #F4522A",
    letterSpacing: 0.3,
  },
  fieldWrap: {
    marginBottom: 18,
  },
  label: {
    display: "block",
    fontSize: 13,
    fontWeight: 600,
    color: "#cccccc",
    marginBottom: 6,
    letterSpacing: 0.2,
    textTransform: "uppercase",
  },
  required: {
    color: "#F4522A",
  },
  hint: {
    fontSize: 12,
    color: "#666",
    marginBottom: 5,
    fontStyle: "italic",
    lineHeight: 1.4,
  },
  input: {
    width: "100%",
    padding: "10px 14px",
    border: "1px solid #2E2E2E",
    borderRadius: 6,
    fontSize: 14,
    color: "#ffffff",
    background: "#111111",
    outline: "none",
    boxSizing: "border-box",
    transition: "border-color 0.2s",
    colorScheme: "dark",
  },
  select: {
    width: "100%",
    padding: "10px 14px",
    border: "1px solid #2E2E2E",
    borderRadius: 6,
    fontSize: 14,
    color: "#ffffff",
    background: "#111111",
    outline: "none",
    boxSizing: "border-box",
    cursor: "pointer",
    appearance: "auto",
    colorScheme: "dark",
  },
  radioGroup: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  radioLabel: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    fontSize: 14,
    color: "#cccccc",
    cursor: "pointer",
    padding: "8px 12px",
    borderRadius: 6,
    border: "1px solid #2E2E2E",
    background: "#111111",
    transition: "border-color 0.15s, color 0.15s",
  },
  radioLabelChecked: {
    borderColor: "#F4522A",
    color: "#ffffff",
    background: "rgba(244,82,42,0.08)",
  },
  radioInput: {
    accentColor: "#F4522A",
    width: 15,
    height: 15,
    flexShrink: 0,
    cursor: "pointer",
  },
  navButtons: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 32,
    paddingTop: 20,
    borderTop: "1px solid #2E2E2E",
  },
  btnPrev: {
    padding: "11px 24px",
    background: "transparent",
    border: "2px solid #2E2E2E",
    borderRadius: 7,
    fontSize: 14,
    fontWeight: 600,
    color: "#aaa",
    cursor: "pointer",
    transition: "border-color 0.2s, color 0.2s",
  },
  btnNext: {
    marginLeft: "auto",
    padding: "11px 32px",
    background: "#F4522A",
    border: "none",
    borderRadius: 7,
    fontSize: 14,
    fontWeight: 700,
    color: "#ffffff",
    cursor: "pointer",
    letterSpacing: 0.3,
    boxShadow: "0 4px 16px rgba(244,82,42,0.35)",
    transition: "opacity 0.2s",
  },
  btnSubmit: {
    marginLeft: "auto",
    padding: "12px 36px",
    background: "#F4522A",
    border: "none",
    borderRadius: 7,
    fontSize: 15,
    fontWeight: 700,
    color: "#ffffff",
    cursor: "pointer",
    letterSpacing: 0.5,
    boxShadow: "0 4px 20px rgba(244,82,42,0.45)",
  },
};