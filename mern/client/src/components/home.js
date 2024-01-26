import {
  Card,
  Select,
  TextInput,
  Button,
  Table,
  Group,
  Text,
  Modal,
  Title,
  createStyles,
  Container,
} from "@mantine/core";
import { Pagination } from "@mantine/core";
import { useForm } from "@mantine/form";
import React, { useEffect, useState } from "react";
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { HeaderResponsive } from "./header";
import request from "sync-request";
import { modals } from "@mantine/modals";
import { useDisclosure } from "@mantine/hooks";
import { BiTrash } from "react-icons/bi";
import { BiEditAlt } from "react-icons/bi";
import { BiArea } from "react-icons/bi";
import { IconContext } from "react-icons";
import { useTranslation } from "react-i18next";
import { HeaderMegaMenu } from "../components/website/databaseHeader";
import { FooterCentered } from "../components/website/websiteFooter";
const links = require("../components/website/links.json")["links"];

const useStyles = createStyles((theme) => ({
  title: {
    textAlign: "left",
    fontWeight: 800,
    fontSize: 40,
    letterSpacing: -1,
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    marginBottom: theme.spacing.xs,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,

    "@media (max-width: 520px)": {
      fontSize: 28,
      textAlign: "center",
    },
  },
}));

const Invoice = (props) => (
  <tr>
    <td>{props.invoice.IssueDate}</td>
    <td>{props.invoice.DueDate}</td>
    <td>{props.invoice.PayableAmount}</td>
    <td>{props.invoice.BuyerRef}</td>
    <td>{props.invoice.SalesOrderId}</td>
    <IconContext.Provider value={{ color: "#DD5573", size: "2em" }}>
      <td>
        {" "}
        <BiEditAlt
          onClick={() => {
            props.edit(props.invoice._id);
          }}
        >
          {" "}
          Edit{" "}
        </BiEditAlt>
      </td>
      <td>
        {" "}
        <BiArea
          onClick={() => {
            props.view(props.invoice._id);
          }}
        >
          {" "}
          View{" "}
        </BiArea>
      </td>
      <td>
        {" "}
        <BiTrash
          className="btn btn-link"
          onClick={() => {
            props.deleteInvoice(props.invoice._id);
          }}
        >
          {" "}
          Delete{" "}
        </BiTrash>
      </td>
    </IconContext.Provider>
  </tr>
);

function getToken() {
  const tokenString = sessionStorage.getItem("token");
  const userToken = JSON.parse(tokenString);
  console.log(userToken);
  return userToken;
}

export default function InvoicesList() {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 15; // Adjust this value to your preference
  const { t } = useTranslation();
  const { classes } = useStyles();
  const navigate = useNavigate();
  const [invoices, setInvoices] = useState([]);
  const [sortby, setSortby] = useState(null);
  const [sortfor, setSortfor] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const [opened, { open, close }] = useDisclosure(false); // for modals
  const totalPages = Math.ceil(invoices.length / itemsPerPage);

  // const [searchparams] = useSearchParams();

  const upload = () => {
    console.log(JSON.parse(userDetails).sub);
    navigate({
      pathname: "/create",
      search: createSearchParams({
        id: JSON.parse(userDetails).sub,
      }).toString(),
    });
  };

  const create = () => {
    console.log(JSON.parse(userDetails).sub);
    navigate({
      pathname: "/formcreate",
      search: createSearchParams({
        id: JSON.parse(userDetails).sub,
      }).toString(),
    });
  };

  const edit = (Invoice_id) => {
    console.log(JSON.parse(userDetails).sub);
    navigate({
      pathname: "/edit",
      search: createSearchParams({
        invoiceId: Invoice_id,
      }).toString(),
    });
  };

  const view = (Invoice_id) => {
    console.log(JSON.parse(userDetails).sub);
    navigate({
      pathname: "/view",
      search: createSearchParams({
        invoiceId: Invoice_id,
      }).toString(),
    });
  };

  //set the userdetails using the access token
  useEffect(() => {
    const token = getToken();
    console.log(token);

    fetch(`http://localhost:8080/invoices/userinfo/${token}`, {
      method: "GET",
    })
      .then((response) => response.text())
      .then((result) => {
        console.log(result);
        setUserDetails(result);
        console.log(JSON.parse(userDetails).sub);
      })
      .catch((error) => console.log("error", error));
    return;
  }, []);

  const confirmDelete = (id) =>
    modals.openConfirmModal({
      title: "Are you sure you want to delete this Invoice?",
      children: <Text size="sm">{t("DeleteComfirm")}</Text>,
      labels: { confirm: "Confirm", cancel: "Cancel" },
      onCancel: () => {
        console.log("Cancel");
        return;
      },
      onConfirm: () => {
        console.log("Confirmed");
        deleteInvoice(id);
      },
    });

  const form = useForm({
    initialValues: {
      sortby: "IssueDate",
      sortfor: "",
    },
  });

  async function queryDatabase(formvalues) {
    console.log(formvalues);
    const res = new request(
      "GET",
      `http://localhost:8080/invoices/query?sortby=${formvalues.sortby}&sortfor=${formvalues.sortfor}&username=${userDetails.sub}`
    );
    const invoices = JSON.parse(res.body);
    if (invoices.length == 0) {
      window.alert("No results for this query");
    } else {
      console.log(invoices);
    }
    setInvoices(invoices);
  }

  // This method fetches the invoices from the database.

  async function getAll() {
    const user = userDetails;
    console.log(JSON.parse(userDetails).sub);
    const res2 = new request(
      "GET",
      `http://localhost:8080/invoices?Username=${JSON.parse(userDetails).sub}`
    );
    const invoices = JSON.parse(res2.body);
    setInvoices(invoices);
  }

  // This method will delete a invoice
  async function deleteInvoice(id) {
    console.log(id);
    await fetch(`http://localhost:8080/invoices/${id}`, {
      method: "DELETE",
    });

    const newRecords = invoices.filter((el) => el._id !== id);
    setInvoices(newRecords);
  }

  // This method will map out the invoices on the table
  function invoiceList() {
    const indexOfLastInvoice = currentPage * itemsPerPage;
    const indexOfFirstInvoice = indexOfLastInvoice - itemsPerPage;
    const currentInvoices = invoices.slice(
      indexOfFirstInvoice,
      indexOfLastInvoice
    );

    return currentInvoices.map((invoice) => {
      return (
        <Invoice
          username={invoice.Username}
          invoice={invoice}
          deleteInvoice={() => confirmDelete(invoice._id)}
          edit={() => edit(invoice._id)}
          key={invoice._id}
          view={() => view(invoice._id)}
        />
      );
    });
  }

  // Everything returned
  return (
    <Container py="md">
      <div>
        <HeaderMegaMenu />

        <Modal opened={opened} onClose={close}>
          <form
            onSubmit={form.onSubmit((values) => {
              queryDatabase(values);
            })}
          >
            <Select
              placeholder="Pick one"
              data={[
                "IssueDate",
                "DueDate",
                "PayableAmount",
                "BuyerRef",
                "SalesOrderId",
              ]}
              label="Search by:"
              value={sortby}
              onChange={setSortby}
              {...form.getInputProps("sortby", { type: "Select" })}
            />
            <TextInput
              withAsterisk
              label="Search for:"
              placeholder="09/10/2003"
              value={sortfor}
              onChange={setSortfor}
              {...form.getInputProps("sortfor", { type: "TextInput" })}
            />

            <Group position="right" mt="md">
              <Button type="submit" fullWidth onClick={close} mt="md">
                {t("Apply")}
              </Button>
            </Group>
          </form>
        </Modal>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            color: "white",
          }}
        >
          <Title className={classes.title}>{t("Dashboard")}</Title>

          <Group mt="md" mb="xs">
            <Button onClick={open}>{t("Filter")}</Button>
            <Button onClick={() => getAll()}>{t("All")}</Button>
            <Button onClick={upload}>Upload an xml invoice</Button>
            <Button onClick={create}>{t("Create")}</Button>
          </Group>

          <div style={{ margin: "60px 0px" }}>
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Table>
                <thead>
                  <tr>
                    <th>{t("IssueDate")}</th>
                    <th>{t("DueDate")}</th>
                    <th>{t("PayableAmount")}</th>
                    <th>{t("BuyerRef")}</th>
                    <th>{t("SalesOrderId")}</th>
                    <th>{t("Edit")}</th>
                    <th>{t("Download")}</th>
                    <th>{t("Delete")}</th>
                  </tr>
                </thead>
                <tbody>{invoiceList()}</tbody>
              </Table>
              <Pagination
                total={totalPages}
                current={currentPage}
                onChange={setCurrentPage}
                size="md"
                color="blue"
                shadow="xs"
              />
            </Card>
          </div>
        </div>
        <FooterCentered links={links} />
      </div>
    </Container>
  );
}