import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFViewer,
  Image,
  Link,
} from "@react-pdf/renderer";
import { format, addMonths } from "date-fns";
import { RentDetails } from "../types/receipt";

const styles = StyleSheet.create({
  page: {
    padding: 20,
  },
  receipt: {
    marginBottom: 20,
    border: "1pt solid black",
    padding: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
  },
  receiptInfo: {
    fontSize: 10,
  },
  content: {
    fontSize: 10,
    marginBottom: 20,
  },
  footer: {
    marginTop: 10,
    fontSize: 10,
  },
  signature: {
    marginTop: 10,
    alignSelf: "flex-end",
  },
  signatureImage: {
    width: 150,
    height: 50,
  },
});

interface RentReceiptProps {
  data: RentDetails;
}

export const RentReceipt: React.FC<RentReceiptProps> = ({ data }) => {
  const generateReceipts = () => {
    const receipts = [];
    const startDate = new Date(data.startDate);

    for (let i = 0; i < data.numberOfMonths; i++) {
      const currentDate = addMonths(startDate, i);
      const endDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        0
      );

      receipts.push({
        month: format(currentDate, "MMMM yyyy"),
        startDate: format(currentDate, "MMM d, yyyy"),
        endDate: format(endDate, "MMM d, yyyy"),
        receiptDate: format(addMonths(currentDate, 1), "MMM d, yyyy"),
        receiptNo: i + 1,
      });
    }

    return receipts;
  };

  const receiptsPerPage = 3; // Number of receipts per page
  const receipts = generateReceipts();
  const pages = [];

  for (let i = 0; i < receipts.length; i += receiptsPerPage) {
    pages.push(receipts.slice(i, i + receiptsPerPage));
  }

  return (
    <PDFViewer style={{ width: "100%", height: "600px" }}>
      <Document>
        {pages.map((pageReceipts, pageIndex) => (
          <Page key={pageIndex} size="A4" style={styles.page}>
            {pageReceipts.map((receipt, index) => (
              <View key={index} style={styles.receipt}>
                <View style={styles.header}>
                  <View>
                    <Text style={styles.title}>
                      RENT RECEIPT {receipt.month}
                    </Text>
                    <Link
                      src={"https://rentmemo.netlify.app"}
                      style={styles.receiptInfo}
                    >
                      <Text style={styles.receiptInfo}>
                        Generated via Memo App
                      </Text>
                    </Link>
                  </View>
                  <View>
                    <Text style={styles.receiptInfo}>
                      Receipt No: {receipt.receiptNo}
                    </Text>
                    <Text style={styles.receiptInfo}>
                      Date: {receipt.receiptDate}
                    </Text>
                  </View>
                </View>

                <View style={styles.content}>
                  <Text>Received sum of INR Rs.</Text>
                  <Text>{data.totalRent}</Text>
                  <Text>
                    from {data.tenants[0].name} towards the rent of property
                    located at {data.propertyAddress} for the period from{" "}
                    {receipt.startDate} to {receipt.endDate}.
                  </Text>
                </View>

                <View style={styles.footer}>
                  <Text>{data.landlordName} (Landlord)</Text>
                  <Text>Pan: {data.landlordPan}</Text>
                </View>

                <View style={styles.signature}>
                  <Image src={data.signature} style={styles.signatureImage} />
                </View>
              </View>
            ))}
          </Page>
        ))}
      </Document>
    </PDFViewer>
  );
};
