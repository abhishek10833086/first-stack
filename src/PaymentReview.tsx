import React from "react";
import "./PaymentReview.css";
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Chip,
  Container,
  Grid,
  Link,
  Stack,
  Step,
  StepContent,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { YinYangThemesMenu } from "@abhishekzambare/mui";

type Severity = "high" | "medium" | "low";
type ApprovalStatus = "completed" | "current" | "pending";

interface PaymentReviewData {
  title: string;

  status: {
    code: string;
    label: string;
  };

  description: string;
  currentPayment: number;
  totalPayments: number;

  exceptionSummary: {
    count: number;
    severity: Severity;
    message: string;
    description: string;
  };

  paymentInstruction: {
    paymentId: string;
    paymentType: string;
    amount: number;
    currency: string;
    formattedAmount: string;
    valueDate: string;
    purpose: string;
    customer: string;
    initiatedBy: string;
    initiatedOn: string;
  };

  beneficiaryInformation: {
    beneficiaryName: string;
    accountNumber: string;
    bankName: string;
    bankCountry: string;
    swiftBic: string;
    bankAddress: string;
  };

  approvalState: {
    currentStep: string;
    steps: Array<{
      order: number;
      id: string;
      label: string;
      status: ApprovalStatus;
      actor: string | null;
      timestamp: string | null;
    }>;
  };

  missingMandatoryData: {
    status: string;
    count: number;
    fields: string[];
    message: string;
    description: string;
  };

  deviations: Array<{
    id: string;
    type: string;
    severity: Severity;
    title: string;
    description: string;
    paymentAmount: number;
    historicalAverage: number;
    currency: string;
    ratio: number;
    ruleId: string;
  }>;

  recommendedReviewAction: {
    type: string;
    label: string;
    steps: string[];
  };

  actions: Array<{
    id: string;
    label: string;
    enabled: boolean;
  }>;
}

// interface PaymentReviewProps {
//   data: PaymentReviewData;
// }

const formatDate = (value: string | null) => {
  if (!value) return "Pending";

  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
};

const formatCurrency = (amount: number, currency: string) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
  }).format(amount);

const Detail = ({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) => (
  <Stack direction={"row"} spacing={2} sx={{ justifyContent: "space-between" }}>
    <Typography variant="subtitle1">{label}</Typography>
    <Typography variant="subtitle1" color="textSecondary">
      {value}
    </Typography>
  </Stack>
);

const PaymentReview = ({ data }: any) => {
  const {
    paymentInstruction,
    beneficiaryInformation,
    approvalState,
    missingMandatoryData,
    deviations,
    recommendedReviewAction,
  } = data;

  const handleAction = (action: PaymentReviewData["actions"][number]) => {
    // Demo only.
    // Does not execute, release or automatically approve a payment.
    console.log("Review action:", action.id);
  };

  return (
    <Container sx={{ mt: 2 }}>
      {/* Header */}

      <Stack
        direction={"row"}
        spacing={1}
        sx={{ alignItems: "center", justifyContent: "space-between" }}
      >
        <Link>
          <Stack direction={"row"} spacing={2} sx={{ alignItems: "center" }}>
            <ArrowBackIcon />
            Back to Queue
          </Stack>
        </Link>
        <YinYangThemesMenu />
      </Stack>

      <Box sx={{ overflow: "auto", height: "calc(100vh - 130px)", my: 2 }}>
        <Stack direction={"row"} spacing={1} sx={{ alignItems: "center" }}>
          <Typography variant="h4">{data.title}</Typography>
          <Chip color="secondary" label={data.status.label}></Chip>
        </Stack>
        <Typography variant="subtitle1">{data.description}</Typography>

        {/* Exception banner */}

        {data.exceptionSummary.count > 0 && (
          <Alert severity="error" sx={{ my: 2 }}>
            <AlertTitle>{data.exceptionSummary.message}</AlertTitle>{" "}
            {data.exceptionSummary.description}
          </Alert>
        )}

        {/* Main Information */}

        <Grid container spacing={2}>
          <Grid size={4}>
            <Card sx={{ height: "100%" }}>
              <CardHeader title="1. Payment Instruction"></CardHeader>
              <CardContent>
                <Detail
                  label="Payment ID"
                  value={paymentInstruction.paymentId}
                />

                <Detail
                  label="Payment Type"
                  value={paymentInstruction.paymentType}
                />

                <Detail
                  label="Amount"
                  value={paymentInstruction.formattedAmount}
                />

                <Detail
                  label="Value Date"
                  value={paymentInstruction.valueDate}
                />

                <Detail label="Currency" value={paymentInstruction.currency} />

                <Detail
                  label="Purpose / Reference"
                  value={paymentInstruction.purpose}
                />

                <Detail label="Customer" value={paymentInstruction.customer} />

                <Detail
                  label="Initiated By"
                  value={paymentInstruction.initiatedBy}
                />

                <Detail
                  label="Initiated On"
                  value={formatDate(paymentInstruction.initiatedOn)}
                />
              </CardContent>
            </Card>
          </Grid>
          <Grid size={4}>
            <Card sx={{ height: "100%" }}>
              <CardHeader title="2. Beneficiary Information"></CardHeader>
              <CardContent>
                <Detail
                  label="Beneficiary Name"
                  value={beneficiaryInformation.beneficiaryName}
                />

                <Detail
                  label="Account Number"
                  value={beneficiaryInformation.accountNumber}
                />

                <Detail
                  label="Bank Name"
                  value={beneficiaryInformation.bankName}
                />

                <Detail
                  label="Bank Country"
                  value={beneficiaryInformation.bankCountry}
                />

                <Detail
                  label="SWIFT / BIC"
                  value={beneficiaryInformation.swiftBic}
                />

                <Detail
                  label="Bank Address"
                  value={beneficiaryInformation.bankAddress}
                />
              </CardContent>
            </Card>
          </Grid>
          <Grid size={4}>
            <Card sx={{ height: "100%" }}>
              <CardHeader title="3. Approval State"></CardHeader>
              <CardContent>
                <Stepper activeStep={1} orientation="vertical">
                  {approvalState.steps.map((step: any) => (
                    <Step key={step.id}>
                      <StepLabel>
                        {step.label}{" "}
                        <Box sx={{ ml: 0 }}>
                          <Typography variant="subtitle2" color="textSecondary">
                            {formatDate(step.timestamp)}
                          </Typography>
                          {step.actor && (
                            <Typography
                              variant="subtitle2"
                              color="textSecondary"
                            >
                              {step.actor}
                            </Typography>
                          )}
                        </Box>
                      </StepLabel>
                    </Step>
                  ))}
                </Stepper>
                {/* <div className="approval-timeline">
                  {approvalState.steps.map((step: any, index: number) => (
                    <div
                      className={`approval-step ${step.status}`}
                      key={step.id}
                    >
                      <div className="timeline-column">
                        <Box
                          className="step-circle"
                          // sx={{ backgroundColor: "primary.main" }}
                        >
                          {step.status === "completed" ? "✓" : step.order}
                        </Box>

                        {index < approvalState.steps.length - 1 && (
                          <div className="timeline-line" />
                        )}
                      </div>

                      <div className="step-content">
                        <Stack direction={"row"} spacing={2}>
                          <Typography variant="subtitle1">
                            {step.label}
                          </Typography>

                          {step.status === "current" && (
                            <Chip label={"Current"} color="primary"></Chip>
                          )}
                        </Stack>

                        <Typography variant="subtitle2" color="textSecondary">
                          {formatDate(step.timestamp)}
                        </Typography>

                        {step.actor && (
                          <Typography variant="subtitle2" color="textSecondary">
                            {step.actor}
                          </Typography>
                        )}
                      </div>
                    </div>
                  ))}
                </div> */}
              </CardContent>
            </Card>
          </Grid>

          <Grid size={12}>
            <Card>
              <CardHeader title="4. Missing Mandatory Data"></CardHeader>
              <CardContent>
                <Alert severity="success">
                  <AlertTitle>{missingMandatoryData.message}</AlertTitle>{" "}
                  {missingMandatoryData.description}{" "}
                  {missingMandatoryData.fields.length > 0 && (
                    <ul>
                      {missingMandatoryData.fields.map(
                        (
                          field:
                            | boolean
                            | React.ReactElement<
                                unknown,
                                string | React.JSXElementConstructor<any>
                              >
                            | Iterable<React.ReactNode>
                            | Promise<
                                | string
                                | number
                                | bigint
                                | boolean
                                | React.ReactPortal
                                | React.ReactElement<
                                    unknown,
                                    string | React.JSXElementConstructor<any>
                                  >
                                | Iterable<React.ReactNode>
                                | null
                                | undefined
                              >
                            | React.Key
                            | null
                            | undefined,
                        ) => (
                          <li>{field}</li>
                        ),
                      )}
                    </ul>
                  )}
                </Alert>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={12}>
            <Card>
              <CardHeader title="5. Deviations / Exceptions"></CardHeader>
              <CardContent>
                <div className="deviation-list">
                  {deviations.map(
                    (deviation: {
                      id: React.Key | null | undefined;
                      severity:
                        | string
                        | number
                        | bigint
                        | boolean
                        | React.ReactElement<
                            unknown,
                            string | React.JSXElementConstructor<any>
                          >
                        | Iterable<React.ReactNode>
                        | React.ReactPortal
                        | Promise<
                            | string
                            | number
                            | bigint
                            | boolean
                            | React.ReactPortal
                            | React.ReactElement<
                                unknown,
                                string | React.JSXElementConstructor<any>
                              >
                            | Iterable<React.ReactNode>
                            | null
                            | undefined
                          >
                        | null
                        | undefined;
                      title:
                        | string
                        | number
                        | bigint
                        | boolean
                        | React.ReactElement<
                            unknown,
                            string | React.JSXElementConstructor<any>
                          >
                        | Iterable<React.ReactNode>
                        | React.ReactPortal
                        | Promise<
                            | string
                            | number
                            | bigint
                            | boolean
                            | React.ReactPortal
                            | React.ReactElement<
                                unknown,
                                string | React.JSXElementConstructor<any>
                              >
                            | Iterable<React.ReactNode>
                            | null
                            | undefined
                          >
                        | null
                        | undefined;
                      description:
                        | string
                        | number
                        | bigint
                        | boolean
                        | React.ReactElement<
                            unknown,
                            string | React.JSXElementConstructor<any>
                          >
                        | Iterable<React.ReactNode>
                        | React.ReactPortal
                        | Promise<
                            | string
                            | number
                            | bigint
                            | boolean
                            | React.ReactPortal
                            | React.ReactElement<
                                unknown,
                                string | React.JSXElementConstructor<any>
                              >
                            | Iterable<React.ReactNode>
                            | null
                            | undefined
                          >
                        | null
                        | undefined;
                      paymentAmount: number;
                      currency: string;
                      historicalAverage: number;
                      ratio:
                        | string
                        | number
                        | bigint
                        | boolean
                        | React.ReactElement<
                            unknown,
                            string | React.JSXElementConstructor<any>
                          >
                        | Iterable<React.ReactNode>
                        | React.ReactPortal
                        | Promise<
                            | string
                            | number
                            | bigint
                            | boolean
                            | React.ReactPortal
                            | React.ReactElement<
                                unknown,
                                string | React.JSXElementConstructor<any>
                              >
                            | Iterable<React.ReactNode>
                            | null
                            | undefined
                          >
                        | null
                        | undefined;
                      ruleId:
                        | string
                        | number
                        | bigint
                        | boolean
                        | React.ReactElement<
                            unknown,
                            string | React.JSXElementConstructor<any>
                          >
                        | Iterable<React.ReactNode>
                        | React.ReactPortal
                        | Promise<
                            | string
                            | number
                            | bigint
                            | boolean
                            | React.ReactPortal
                            | React.ReactElement<
                                unknown,
                                string | React.JSXElementConstructor<any>
                              >
                            | Iterable<React.ReactNode>
                            | null
                            | undefined
                          >
                        | null
                        | undefined;
                    }) => (
                      <Alert severity="error">
                        <AlertTitle>{deviation.title}</AlertTitle>{" "}
                        {deviation.description}
                        <div className="deviation-data">
                          <span>
                            Payment:{" "}
                            <strong>
                              {formatCurrency(
                                deviation.paymentAmount,
                                deviation.currency,
                              )}
                            </strong>
                          </span>

                          <span>
                            Historical average:{" "}
                            <strong>
                              {formatCurrency(
                                deviation.historicalAverage,
                                deviation.currency,
                              )}
                            </strong>
                          </span>

                          <span>
                            Ratio: <strong>{deviation.ratio}x</strong>
                          </span>

                          <span>
                            Rule: <strong>{deviation.ruleId}</strong>
                          </span>
                        </div>
                      </Alert>
                    ),
                  )}
                </div>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={12}>
            <Card>
              <CardHeader title="6. Recommended Review Action"></CardHeader>
              <CardContent>
                <Alert severity="info">
                  <AlertTitle>
                    Recommended Action: {recommendedReviewAction.label}
                  </AlertTitle>{" "}
                  <ul>
                    {recommendedReviewAction.steps.map(
                      (
                        step:
                          | boolean
                          | React.ReactElement<
                              unknown,
                              string | React.JSXElementConstructor<any>
                            >
                          | Iterable<React.ReactNode>
                          | Promise<
                              | string
                              | number
                              | bigint
                              | boolean
                              | React.ReactPortal
                              | React.ReactElement<
                                  unknown,
                                  string | React.JSXElementConstructor<any>
                                >
                              | Iterable<React.ReactNode>
                              | null
                              | undefined
                            >
                          | React.Key
                          | null
                          | undefined,
                      ) => (
                        <li>{step}</li>
                      ),
                    )}
                  </ul>
                </Alert>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      {/* Actions */}
      <div className="review-actions">
        {data.actions.map((action: { id: any; enabled: any; label: any }) => {
          const primary = action.id === "send-for-approval";

          const reject = action.id === "reject";

          return (
            <Button
              key={action.id}
              type="button"
              disabled={!action.enabled}
              variant="contained"
              color={primary ? "primary" : reject ? "error" : "secondary"}
              onClick={() => handleAction(action)}
            >
              {action.label}
            </Button>
          );
        })}
      </div>
    </Container>
  );
};

export default PaymentReview;
