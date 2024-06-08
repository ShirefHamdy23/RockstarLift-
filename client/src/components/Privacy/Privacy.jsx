import { Row, Col, Container } from "react-bootstrap";
import PrivacyCard from "./PrivacyCard";

const Privacy = () => {
  const privayCards = [
    {
      header: "CONFIDENTIALITY AND NON-DISCLOSURE",
      body: "The company acknowledges the sensitive nature of our clients’ data and agrees to treat all client information as strictly confidential. We will not disclose, sell, or share any client data, including lists, dialers, or transaction details, with any third parties without the explicit consent of the client.",
    },
    {
      header: "Data Security Measures",
      body: "the company implements robust technical and organizational measures to safeguard client data from unauthorized access, loss, or alteration. We employ industry-standard security protocols, including encryption, secure storage, access controls, firewalls, and intrusion detection systems, to protect client information.",
    },
    {
      header: "Limited Access",
      body: "the company will use client data solely for the purpose of providing services as agreed upon with the client. We will not utilize client data for any other purposes or disclose it to any third parties, except as required to fulfill our contractual obligations or with the client’s explicit consent.",
    },
    {
      header: "Data Usage Restrictions",
      body: "The company acknowledges the sensitive nature of our clients’ data and agrees to treat all client information as strictly confidential. We will not disclose, sell, or share any client data, including lists, dialers, or transaction details, with any third parties without the explicit consent of the client.",
    },
    {
      header: "Data Retention",
      body: "the company retains client data, including lists, dialers, and transaction details, only for as long as necessary to fulfill the agreed-upon services or as required by applicable laws and regulations. Once the retention period expires, we securely dispose of or anonymize client data to prevent unauthorized access.",
    },
    {
      header: "Compliance With Laws",
      body: "the company complies with all applicable data protection laws and regulations governing the collection, storage, and processing of personal data. We assist clients in meeting their legal obligations, including responding to data subject requests, as reasonably required.",
    },
    {
      header: "Subcontractors & Third Parties",
      body: "in certain cases, the company may engage subcontractors or third-party service providers to assist in delivering services to clients. We ensure that these entities adhere to the same high standards of data protection and confidentiality as outlined in these privacy terms.",
    },
    {
      header: "Breach Notification",
      body: "in the event of a data breach that may result in the unauthorized acquisition, access, or disclosure of client data, the company will promptly notify the affected client and take immediate steps to mitigate the effects of such breach.",
    },
    {
      header: "Modification Of Privacy Terms",
      body: "these privacy terms may be modified or amended only by written agreement between the company and the client.",
    },
  ];
  return (
    <div className="privacy">
      <div className="main"></div>
      <Container className="privacy_content">
        <div class="title text-center mb-5">
          <h2 className="header">Privacy Terms</h2>
        </div>
        <Row>
          {privayCards.map(({ header, body }) => (
            <Col md={4} key={header}>
              <PrivacyCard header={header} body={body} />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default Privacy;
