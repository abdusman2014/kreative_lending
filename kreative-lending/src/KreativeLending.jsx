import { useState } from "react";

const STEPS = [
  { id: 1, label: "Loan Programs" },
  { id: 2, label: "Property Information" },
  { id: 3, label: "Borrower Information" },
  { id: 4, label: "Entity Information" },
];

const TOTAL_STEPS = 4;

const progressPct = { 1: 25, 2: 50, 3: 75, 4: 100 };

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
            <option key={o} value={o}>{o}</option>
          ) : (
            <option key={o.value} value={o.value}>{o.label}</option>
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
          return (
            <label key={val} style={styles.radioLabel}>
              <input
                type="radio"
                name={name}
                value={val}
                checked={value === val}
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
          return (
            <label key={val} style={styles.radioLabel}>
              <input
                type="checkbox"
                checked={value.includes(val)}
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

function Textarea({ label, required, hint, ...props }) {
  return (
    <div style={styles.fieldWrap}>
      {label && <Label required={required}>{label}</Label>}
      {hint && <div style={styles.hint}>{hint}</div>}
      <textarea style={{ ...styles.input, minHeight: 90, resize: "vertical" }} {...props} />
    </div>
  );
}

function Row({ children, cols = 2 }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: "0 20px" }}>
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
  const showGator = loanProduct === "Gator Lending (EMD, Double Closing, Morby Method, Gap Funding, Etc..)";
  const showPortfolio = loanProduct === "Portfolio Loan";
  const showDSCR = loanProduct === "DSCR Rental Loan";

  const isPurchase =
    data.purchaseOrRefi === "Purchase - Currently under contract" ||
    data.purchaseOrRefi === "Purchase - Not Under Contract Yet";
  const isRefi = data.purchaseOrRefi === "Refinance - I already own";
  const isRenovation = data.isRenovation === "Yes";
  const needsPof = data.needsPof === "Yes";

  return (
    <div>
      <SectionTitle>Loan Program</SectionTitle>

      <Row>
        <Select
          label="Are you a Borrower, Broker, Connector, or Wholesaler?"
          required
          options={[
            { value: "Existing Account", label: "Existing Account (Previously Submitted a Deal)" },
            { value: "No", label: "Yes - Borrower" },
            "Yes - Broker",
            "Yes - Connector",
            "Yes - Wholesaler",
            "Yes - Transaction Coordinator",
            "Yes - Transactional Lender",
            "Yes - Gap Funder",
          ]}
          value={data.role || ""}
          onChange={(e) => set("role", e.target.value)}
        />
        <Input
          label="Target Close Date"
          required
          hint="Close date is dependent on the third party's ability to accommodate"
          type="date"
          value={data.closeDate || ""}
          onChange={(e) => set("closeDate", e.target.value)}
        />
      </Row>

      <Row>
        <div style={styles.fieldWrap}>
          <Label required>Your Name</Label>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 12px" }}>
            <input style={styles.input} placeholder="First Name" value={data.firstName || ""} onChange={(e) => set("firstName", e.target.value)} />
            <input style={styles.input} placeholder="Last Name" value={data.lastName || ""} onChange={(e) => set("lastName", e.target.value)} />
          </div>
        </div>
        <Input label="Phone Number" required type="tel" value={data.phone || ""} onChange={(e) => set("phone", e.target.value)} />
      </Row>

      <Input label="Email" required type="email" value={data.email || ""} onChange={(e) => set("email", e.target.value)} />

      <Select
        label="Loan Product"
        required
        options={[
          "Fix & Flip | Fix2Rent",
          "Stabilized Bridge Loan",
          "DSCR Rental Loan",
          "Ground Up Construction",
          "Portfolio Loan",
          "Gator Lending (EMD, Double Closing, Morby Method, Gap Funding, Etc..)",
        ]}
        value={loanProduct}
        onChange={(e) => set("loanProduct", e.target.value)}
      />

      {showGator && (
        <CheckGroup
          label="Are you looking for?"
          required
          options={[
            "Earnest Money Deposit (EMD) Loan",
            "Transactional Financing",
            "Double Closing Transactional",
            "Wholesale Funding",
            "Micro Loans",
            "Cost Overrun Loans",
            "Bailout Solutions",
            "Invoice Factoring",
          ]}
          name="gatorOptions"
          value={data.gatorOptions || []}
          onChange={(v) => set("gatorOptions", v)}
        />
      )}

      {showGround && (
        <Select
          label="How many ground up experiences completed?"
          required
          options={["1-2 Properties", "3 Properties", "4 Properties", "5 Properties", "6 Properties", "7 Properties", "8 Properties", "9 Properties", "Other"]}
          value={data.groundUpExp || ""}
          onChange={(e) => set("groundUpExp", e.target.value)}
        />
      )}

      {showPortfolio && (
        <Select
          label="How many properties in total?"
          required
          hint="Submit one property for now, and please attach the rest in the automated email."
          options={["1", "2", "3", "4", "5", "6", "7", "8", "9"]}
          value={data.portfolioCount || ""}
          onChange={(e) => set("portfolioCount", e.target.value)}
        />
      )}

      {!showGator && (
        <>
          <Select
            label="Desired Leverage"
            required
            hint={showDSCR ? "*DSCR - Maximum is 85%" : undefined}
            options={["100%", "96-99%", "91-95%", "86-90%", "81-85%", "76-80%", "71-75%", "66-70%", "60-65%"]}
            value={data.leverage || ""}
            onChange={(e) => set("leverage", e.target.value)}
          />

          <RadioGroup
            label="Is this a Purchase or Refinance?"
            required
            name="purchaseOrRefi"
            options={["Purchase - Currently under contract", "Purchase - Not Under Contract Yet", "Refinance - I already own"]}
            value={data.purchaseOrRefi || ""}
            onChange={(v) => set("purchaseOrRefi", v)}
          />

          {isPurchase && (
            <>
              <Input label="What is the Purchase Price?" required type="text" value={data.purchasePrice || ""} onChange={(e) => set("purchasePrice", e.target.value)} />
              <RadioGroup
                label="Is this a renovation project?"
                required
                name="isRenovation"
                options={["No", "Yes"]}
                value={data.isRenovation || ""}
                onChange={(v) => set("isRenovation", v)}
              />
              {isRenovation && (
                <Input label="Rehab Budget" required hint="Budget included in the loan amount" type="text" value={data.rehabBudget || ""} onChange={(e) => set("rehabBudget", e.target.value)} />
              )}
              {showGround && (
                <Input label="Construction Budget" required hint="Budget included in the loan amount" type="text" value={data.constructionBudget || ""} onChange={(e) => set("constructionBudget", e.target.value)} />
              )}
              <Select
                label="How is the property being sourced?"
                required
                options={["Private Sale", "Wholesaler", "Bankruptcy Sales", "Entity to Entity", "Estate Sale", "Foreclosure Auction", "Inheritance", "MLS", "Online Auction", "Pre-Foreclosure", "Real Estate Agent", "REO", "Sheriff's Sale", "Short Sale"]}
                value={data.propertySourcing || ""}
                onChange={(e) => set("propertySourcing", e.target.value)}
              />
              {data.propertySourcing === "Wholesaler" && (
                <Input label="What is the assignment fee?" type="text" value={data.assignmentFee || ""} onChange={(e) => set("assignmentFee", e.target.value)} />
              )}
              <RadioGroup
                label="Do you need a Proof of Funds?"
                required
                name="needsPof"
                options={["Yes", "No"]}
                value={data.needsPof || ""}
                onChange={(v) => set("needsPof", v)}
              />
            </>
          )}

          {isRefi && (
            <>
              <Select
                label="Loan Purpose"
                required
                options={["Delayed Purchase", "Cash-Out Refinance", "Rate & Term Refinance", "Mid-Construction Refinance"]}
                value={data.loanPurpose || ""}
                onChange={(e) => set("loanPurpose", e.target.value)}
              />
              <Input label="What was the Original Purchase Price?" required type="text" value={data.originalPurchasePrice || ""} onChange={(e) => set("originalPurchasePrice", e.target.value)} />
              <Input label="When was the Property Originally Purchased?" required type="date" value={data.originalPurchaseDate || ""} onChange={(e) => set("originalPurchaseDate", e.target.value)} />
              <RadioGroup
                label="Has Work Already Been Completed?"
                required
                name="workCompleted"
                options={["Yes", "No"]}
                value={data.workCompleted || ""}
                onChange={(v) => set("workCompleted", v)}
              />
              {data.workCompleted === "Yes" && (
                <Input label="Rehab Amount Completed ($)" required type="text" value={data.rehabCompleted || ""} onChange={(e) => set("rehabCompleted", e.target.value)} />
              )}
              <Select
                label="Are there Any Liens on the Property?"
                required
                options={["Yes - 1 lien", "Yes - More than 1 lien", "No - Owned Free and Clear"]}
                value={data.liens || ""}
                onChange={(e) => set("liens", e.target.value)}
              />
              {data.liens && data.liens !== "No - Owned Free and Clear" && (
                <>
                  <Input label="Total Lien Balances on the Property" required type="text" value={data.lienBalances || ""} onChange={(e) => set("lienBalances", e.target.value)} />
                  <Input label="First Lien Monthly Payment (P&I only):" required type="text" value={data.firstLienPayment || ""} onChange={(e) => set("firstLienPayment", e.target.value)} />
                </>
              )}
              <Input label="Loan Amount Being Requested" required type="text" value={data.loanAmount || ""} onChange={(e) => set("loanAmount", e.target.value)} />
            </>
          )}

          {showGround && (
            <>
              <RadioGroup label="Is this a full tear-down?" name="tearDown" options={["Yes", "No – Already demolished"]} value={data.tearDown || ""} onChange={(v) => set("tearDown", v)} />
              <RadioGroup label="Shovel-ready?" name="shovelReady" options={["Yes – Ready to build", "No – Not ready yet"]} value={data.shovelReady || ""} onChange={(v) => set("shovelReady", v)} />
              <RadioGroup label="Permit status:" name="permitStatus" options={["Approved", "Applied", "Not started"]} value={data.permitStatus || ""} onChange={(v) => set("permitStatus", v)} />
              <RadioGroup label="Expansion or change of use?" required name="changeOfUse" options={["Yes", "No"]} value={data.changeOfUse || ""} onChange={(v) => set("changeOfUse", v)} />
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
              <RadioGroup label="Need Gap Funding (2nd position to cover down payment or costs)?" name="gapFunding" options={["Yes", "No"]} value={data.gapFunding || ""} onChange={(v) => set("gapFunding", v)} />
              <RadioGroup label="Is this a Morby Method?" name="morbyMethod" options={["Yes", "No"]} value={data.morbyMethod || ""} onChange={(v) => set("morbyMethod", v)} />
            </>
          )}
        </>
      )}
    </div>
  );
}

function Step2({ data, set }) {
  const showOther = data.propertyType === "Other";
  const showUnits = ["Multifamily (5+ Units)", "Commercial 5-9 units"].includes(data.propertyType);
  const showHOAExpense = data.hasHOA === "Yes";

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
          "Other",
        ]}
        value={data.propertyType || ""}
        onChange={(e) => set("propertyType", e.target.value)}
      />

      {showOther && (
        <Input label="Please specify the property type" value={data.propertyTypeOther || ""} onChange={(e) => set("propertyTypeOther", e.target.value)} />
      )}

      {showUnits && (
        <Input label="How many Units?" required type="text" hint="Multifamily up to 9 units" value={data.unitCount || ""} onChange={(e) => set("unitCount", e.target.value)} />
      )}

      <Row>
        <Input label="As-Is Value" required type="text" value={data.asIsValue || ""} onChange={(e) => set("asIsValue", e.target.value)} />
        <Input label="After Repair Value" hint="For Loans with Rehab Budgets" type="text" value={data.arv || ""} onChange={(e) => set("arv", e.target.value)} />
      </Row>

      <Input label="After Built Value" hint="For loans with Construction Budgets" type="text" value={data.abv || ""} onChange={(e) => set("abv", e.target.value)} />

      <RadioGroup
        label="Is there a Homeowner's Association?"
        name="hasHOA"
        options={["Yes", "No"]}
        value={data.hasHOA || ""}
        onChange={(v) => set("hasHOA", v)}
      />
      {showHOAExpense && (
        <Input label="Est. Monthly HOA Expense" type="text" value={data.hoaExpense || ""} onChange={(e) => set("hoaExpense", e.target.value)} />
      )}

      <Row>
        <Input label="Monthly Rent" type="text" value={data.monthlyRent || ""} onChange={(e) => set("monthlyRent", e.target.value)} />
        <Input label="Annual Tax" type="text" value={data.annualTax || ""} onChange={(e) => set("annualTax", e.target.value)} />
      </Row>
      <Input label="Annual Insurance" type="text" value={data.annualInsurance || ""} onChange={(e) => set("annualInsurance", e.target.value)} />

      <RadioGroup
        label="Is the property leased?"
        required
        name="isLeased"
        options={["Yes - Leased", "No - Not Leased"]}
        value={data.isLeased || ""}
        onChange={(v) => set("isLeased", v)}
      />

      <RadioGroup
        label="Is the property in a rural area?"
        required
        name="isRural"
        options={["Yes", "No", "I don't know"]}
        value={data.isRural || ""}
        onChange={(v) => set("isRural", v)}
      />

      <RadioGroup
        label="Exit Strategy"
        required
        name="exitStrategy"
        options={["Sell (Fix & Flip)", "Refinance (Buy & Hold)", "Either Sell or Refinance"]}
        value={data.exitStrategy || ""}
        onChange={(v) => set("exitStrategy", v)}
      />

      <Textarea
        label="Project Summary"
        placeholder="What should we know about your deal?"
        value={data.projectSummary || ""}
        onChange={(e) => set("projectSummary", e.target.value)}
      />
    </div>
  );
}

function Step3({ data, set }) {
  const hasCoBorrower = data.hasCoBorrower === "Yes";

  return (
    <div>
      <SectionTitle>Borrower/Guarantor Information</SectionTitle>

      <Row>
        <div style={styles.fieldWrap}>
          <Label required>Borrower's Full Name</Label>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 12px" }}>
            <input style={styles.input} placeholder="First" value={data.borrowerFirst || ""} onChange={(e) => set("borrowerFirst", e.target.value)} />
            <input style={styles.input} placeholder="Last" value={data.borrowerLast || ""} onChange={(e) => set("borrowerLast", e.target.value)} />
          </div>
        </div>
        <Input
          label="Phone No."
          required
          hint="**Cannot be Broker's info. Required for servicing a loan."
          type="tel"
          value={data.borrowerPhone || ""}
          onChange={(e) => set("borrowerPhone", e.target.value)}
        />
      </Row>

      <Input
        label="Email Address"
        required
        hint="**Cannot be Broker's info . Required for servicing a loan."
        type="email"
        value={data.borrowerEmail || ""}
        onChange={(e) => set("borrowerEmail", e.target.value)}
      />

      <Row>
        <Input label="Est. Credit Score" required type="text" value={data.creditScore || ""} onChange={(e) => set("creditScore", e.target.value)} />
        <Input label="Cash Reserves" required type="text" value={data.cashReserves || ""} onChange={(e) => set("cashReserves", e.target.value)} />
      </Row>

      <Select
        label="Experience Level"
        required
        hint="*How many similar rehab projects have you completed in the past?"
        options={["0 Completed Deals", "1 Completed Deals", "2 Completed Deals", "3 Completed Deals", "4 Completed Deals", "5 Completed Deals", "6 Completed Deals", "7 Completed Deals", "8 Completed Deals", "9 Completed Deals", "10 Completed Deals", "10+ Completed Deals"]}
        value={data.experienceLevel || ""}
        onChange={(e) => set("experienceLevel", e.target.value)}
      />

      <Select
        label="Citizenship Status"
        required
        options={["US Citizen", "US Permanent Resident(Green Card Holder)", "Foreign National (Non-U.S. Citizen, No Permanent Residency)"]}
        value={data.citizenship || ""}
        onChange={(e) => set("citizenship", e.target.value)}
      />

      <CheckGroup
        label="Do You Have Any Professional Licenses?"
        required
        options={["General Contractor", "Realtor", "None"]}
        name="licenses"
        value={data.licenses || []}
        onChange={(v) => set("licenses", v)}
      />

      <RadioGroup label="Are you hiring a General Contractor?" name="hiringGC" options={["Yes", "No"]} value={data.hiringGC || ""} onChange={(v) => set("hiringGC", v)} />
      <RadioGroup label="Any Bankruptcy, Foreclosure or Mortgages Late in the last 5 years?" name="bankruptcy" options={["Yes", "No"]} value={data.bankruptcy || ""} onChange={(v) => set("bankruptcy", v)} />
      <RadioGroup label="Any judgements or felonies in the past 7 years?" name="judgements" options={["Yes", "No"]} value={data.judgements || ""} onChange={(v) => set("judgements", v)} />

      <RadioGroup
        label="Will someone else be on the loan with you?"
        required
        name="hasCoBorrower"
        options={["No", "Yes"]}
        value={data.hasCoBorrower || ""}
        onChange={(v) => set("hasCoBorrower", v)}
      />

      {hasCoBorrower && (
        <>
          <SectionTitle>Co-Borrower Information</SectionTitle>
          <Row>
            <div style={styles.fieldWrap}>
              <Label required>Co-Borrower's Full Name</Label>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 12px" }}>
                <input style={styles.input} placeholder="First" value={data.coBorrowerFirst || ""} onChange={(e) => set("coBorrowerFirst", e.target.value)} />
                <input style={styles.input} placeholder="Last" value={data.coBorrowerLast || ""} onChange={(e) => set("coBorrowerLast", e.target.value)} />
              </div>
            </div>
            <Input label="Phone No." required type="tel" value={data.coBorrowerPhone || ""} onChange={(e) => set("coBorrowerPhone", e.target.value)} />
          </Row>
          <Input label="Email Address" required type="email" value={data.coBorrowerEmail || ""} onChange={(e) => set("coBorrowerEmail", e.target.value)} />
          <Row>
            <Input label="Est. Credit Score" required type="text" value={data.coCreditScore || ""} onChange={(e) => set("coCreditScore", e.target.value)} />
            <Input label="Cash Reserves" required type="text" value={data.coCashReserves || ""} onChange={(e) => set("coCashReserves", e.target.value)} />
          </Row>
          <Select
            label="Experience Level"
            required
            options={["0 Completed Deals", "1 Completed Deals", "2 Completed Deals", "3 Completed Deals", "4 Completed Deals", "5 Completed Deals", "6 Completed Deals", "7 Completed Deals", "8 Completed Deals", "9 Completed Deals", "10 Completed Deals", "10+ Completed Deals"]}
            value={data.coExperienceLevel || ""}
            onChange={(e) => set("coExperienceLevel", e.target.value)}
          />
          <Select
            label="Citizenship Status"
            required
            options={["US Citizen", "US Permanent Resident(Green Card Holder)", "Foreign National (Non-U.S. Citizen, No Permanent Residency)"]}
            value={data.coCitizenship || ""}
            onChange={(e) => set("coCitizenship", e.target.value)}
          />
        </>
      )}
    </div>
  );
}

function Step4({ data, set }) {
  return (
    <div>
      <SectionTitle>Entity Information</SectionTitle>

      <Input
        label="Entity Name"
        required
        hint="As it Appears in Filing"
        value={data.entityName || ""}
        onChange={(e) => set("entityName", e.target.value)}
      />

      <Row>
        <Input
          label="# of Entity Owners"
          required
          type="number"
          value={data.entityOwners || ""}
          onChange={(e) => set("entityOwners", e.target.value)}
        />
        <Select
          label="Entity Type"
          required
          options={["LLC", "Trust", "Corporation", "Limited Partnership"]}
          value={data.entityType || ""}
          onChange={(e) => set("entityType", e.target.value)}
        />
      </Row>

      <Input
        label="Entity Address"
        required
        value={data.entityAddress || ""}
        onChange={(e) => set("entityAddress", e.target.value)}
      />

      <Select
        label="How did you hear about us?"
        required
        options={["Facebook", "Instagram", "Google", "LinkedIn", "Youtube", "Subto", "Networking Event", "Referral Partner", "Gator Method", "Other"]}
        value={data.hearAboutUs || ""}
        onChange={(e) => set("hearAboutUs", e.target.value)}
      />

      {data.hearAboutUs === "Other" && (
        <Input label="Please specify" value={data.hearAboutUsOther || ""} onChange={(e) => set("hearAboutUsOther", e.target.value)} />
      )}

      <Input label="Referrer Name" value={data.referrerName || ""} onChange={(e) => set("referrerName", e.target.value)} />
      <Input label="Promotion Code" value={data.promoCode || ""} onChange={(e) => set("promoCode", e.target.value)} />

      <div style={styles.fieldWrap}>
        <Label required>Consent</Label>
        <label style={{ display: "flex", gap: 10, alignItems: "flex-start", cursor: "pointer" }}>
          <input
            type="checkbox"
            checked={data.consent || false}
            onChange={(e) => set("consent", e.target.checked)}
            style={{ marginTop: 3, accentColor: "#1a1a2e", flexShrink: 0 }}
          />
          <span style={{ fontSize: 13, color: "#555", lineHeight: 1.5 }}>
            Click to receive communication. By providing your contact information on this website, you consent to receive calls, SMS, and emails from our team and affiliated partners. Your information will remain confidential and will not be sold or shared with any unrelated third parties. By submitting, you confirm that you are the rightful owner of the contact details provided.
          </span>
        </label>
      </div>
    </div>
  );
}

// ─── Main App ────────────────────────────────────────────────────────────────

export default function KreativeLending() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const setField = (key, val) => setFormData((d) => ({ ...d, [key]: val }));

  const pct = progressPct[step];

  const next = () => {
    if (step < TOTAL_STEPS) setStep((s) => s + 1);
    else setSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const prev = () => {
    if (step > 1) setStep((s) => s - 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (submitted) {
    return (
      <div style={styles.page}>
        <div style={styles.header}>
          <img
            src="https://dedicatedcapital.ai/wp-content/uploads/2025/08/Kreative-Lending.webp"
            alt="Kreative Lending"
            style={styles.logo}
          />
        </div>
        <div style={styles.container}>
          <div style={{ textAlign: "center", padding: "60px 20px" }}>
            <div style={{ fontSize: 56, marginBottom: 16 }}>✅</div>
            <h2 style={{ fontSize: 26, color: "#1a1a2e", marginBottom: 12 }}>Application Submitted!</h2>
            <p style={{ color: "#666", fontSize: 15, maxWidth: 400, margin: "0 auto" }}>
              Thank you for submitting your loan application. Our team will review it and reach out to you shortly.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      {/* Header */}
      <div style={styles.header}>
        <img
          src="https://dedicatedcapital.ai/wp-content/uploads/2025/08/Kreative-Lending.webp"
          alt="Kreative Lending"
          style={styles.logo}
        />
      </div>

      <div style={styles.container}>
        {/* Progress bar */}
        <div style={styles.progressWrap}>
          <div style={styles.progressLabel}>
            Step <strong>{step}</strong> of <strong>{TOTAL_STEPS}</strong>
            <span style={styles.progressStepName}> - {STEPS[step - 1].label}</span>
          </div>
          <div style={styles.progressBarOuter}>
            <div
              style={{
                ...styles.progressBarInner,
                width: `${pct}%`,
              }}
            />
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
              <span style={styles.stepPillNum}>{s.id}</span>
              <span style={styles.stepPillLabel}>{s.label}</span>
            </div>
          ))}
        </div>

        {/* Form card */}
        <div style={styles.card}>
          {step === 1 && <Step1 data={formData} set={setField} />}
          {step === 2 && <Step2 data={formData} set={setField} />}
          {step === 3 && <Step3 data={formData} set={setField} />}
          {step === 4 && <Step4 data={formData} set={setField} />}

          {/* Navigation buttons */}
          <div style={styles.navButtons}>
            {step > 1 && (
              <button onClick={prev} style={styles.btnPrev}>
                ← Previous
              </button>
            )}
            <button
              onClick={next}
              style={step < TOTAL_STEPS ? styles.btnNext : styles.btnSubmit}
            >
              {step < TOTAL_STEPS ? "Next →" : "Submit Loan Application"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Styles ──────────────────────────────────────────────────────────────────

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f4f6f9",
    fontFamily: "'Segoe UI', system-ui, -apple-system, sans-serif",
    color: "#1a1a2e",
  },
  header: {
    background: "#1a1a2e",
    padding: "16px 32px",
    display: "flex",
    alignItems: "center",
    boxShadow: "0 2px 12px rgba(0,0,0,0.3)",
  },
  logo: {
    height: 50,
    objectFit: "contain",
  },
  container: {
    maxWidth: 820,
    margin: "0 auto",
    padding: "32px 20px 60px",
  },
  progressWrap: {
    marginBottom: 28,
  },
  progressLabel: {
    fontSize: 14,
    color: "#555",
    marginBottom: 8,
  },
  progressStepName: {
    color: "#1a1a2e",
    fontWeight: 600,
  },
  progressBarOuter: {
    background: "#dde2ea",
    borderRadius: 8,
    height: 10,
    overflow: "hidden",
  },
  progressBarInner: {
    background: "linear-gradient(90deg, #1a1a2e 0%, #3a3a6e 100%)",
    height: "100%",
    borderRadius: 8,
    transition: "width 0.4s ease",
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
    background: "#e8eaf0",
    color: "#888",
    fontSize: 13,
    fontWeight: 500,
    transition: "all 0.2s",
  },
  stepPillActive: {
    background: "#1a1a2e",
    color: "#fff",
  },
  stepPillDone: {
    background: "#c8f0d4",
    color: "#1a7a3a",
  },
  stepPillNum: {
    width: 20,
    height: 20,
    borderRadius: "50%",
    background: "rgba(255,255,255,0.2)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 11,
    fontWeight: 700,
  },
  stepPillLabel: {
    whiteSpace: "nowrap",
  },
  card: {
    background: "#fff",
    borderRadius: 12,
    padding: "36px 40px",
    boxShadow: "0 4px 24px rgba(0,0,0,0.07)",
  },
  sectionTitle: {
    fontSize: 19,
    fontWeight: 700,
    color: "#1a1a2e",
    marginBottom: 20,
    marginTop: 8,
    paddingBottom: 10,
    borderBottom: "2px solid #eef0f5",
  },
  fieldWrap: {
    marginBottom: 18,
  },
  label: {
    display: "block",
    fontSize: 13.5,
    fontWeight: 600,
    color: "#2a2a4e",
    marginBottom: 6,
  },
  required: {
    color: "#cc2200",
  },
  hint: {
    fontSize: 12,
    color: "#888",
    marginBottom: 5,
    fontStyle: "italic",
  },
  input: {
    width: "100%",
    padding: "10px 12px",
    border: "1px solid #d0d5e0",
    borderRadius: 6,
    fontSize: 14,
    color: "#1a1a2e",
    background: "#fafbfd",
    outline: "none",
    boxSizing: "border-box",
    transition: "border-color 0.2s",
  },
  select: {
    width: "100%",
    padding: "10px 12px",
    border: "1px solid #d0d5e0",
    borderRadius: 6,
    fontSize: 14,
    color: "#1a1a2e",
    background: "#fafbfd",
    outline: "none",
    boxSizing: "border-box",
    cursor: "pointer",
    appearance: "auto",
  },
  radioGroup: {
    display: "flex",
    flexDirection: "column",
    gap: 7,
  },
  radioLabel: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    fontSize: 14,
    color: "#333",
    cursor: "pointer",
    padding: "4px 0",
  },
  radioInput: {
    accentColor: "#1a1a2e",
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
    borderTop: "1px solid #eef0f5",
  },
  btnPrev: {
    padding: "11px 24px",
    background: "transparent",
    border: "2px solid #1a1a2e",
    borderRadius: 7,
    fontSize: 14,
    fontWeight: 600,
    color: "#1a1a2e",
    cursor: "pointer",
  },
  btnNext: {
    marginLeft: "auto",
    padding: "11px 32px",
    background: "#1a1a2e",
    border: "none",
    borderRadius: 7,
    fontSize: 14,
    fontWeight: 700,
    color: "#fff",
    cursor: "pointer",
    letterSpacing: 0.3,
  },
  btnSubmit: {
    marginLeft: "auto",
    padding: "12px 36px",
    background: "linear-gradient(135deg, #1a1a2e 0%, #3a3a7e 100%)",
    border: "none",
    borderRadius: 7,
    fontSize: 15,
    fontWeight: 700,
    color: "#fff",
    cursor: "pointer",
    letterSpacing: 0.5,
    boxShadow: "0 4px 14px rgba(26,26,46,0.35)",
  },
};
