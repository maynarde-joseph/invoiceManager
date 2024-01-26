import { Card, Image, Text, Badge, Button, Table, Group, Center } from '@mantine/core';
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {HeaderResponsive} from "./header";
import { t } from 'i18next';
import { useTranslation } from 'react-i18next';

const Invoice = (props) => (
    <tr>
        <td>{props.invoice.IssueDate}</td>
        <td>{props.invoice.DueDate}</td>
        <td>{props.invoice.PayableAmount}</td>
        <td>{props.invoice.BuyerRef}</td>
        <td>{props.invoice.SalesOrderId}</td>
        <td> <Link className="btn btn-link" to={`/edit`}><Button>{t("Edit")}</Button></Link></td>
        <td>
            <Button className="btn btn-link"
                onClick={() => {
                    props.deleteInvoice(props.invoice._id);
                }}
            >
                Delete
            </Button>
        </td>
    </tr>
);



export default function InvoicesList() {
    const [invoices, setInvoices] = useState([]);
    const { t } = useTranslation();
    // This method fetches the invoices from the database.
    useEffect(() => {
        async function getInvoices() {
            const response = await fetch(`http://localhost:8080/invoices/query`, {
                method: "GET"
            });

            if (!response.ok) {
                const message = `An error occurred: ${response.statusText}`;
                console.log(message);
                return;
            }
            const invoices = await response.json();
            console.log(invoices);
            setInvoices(invoices);
        }

        getInvoices();

        return;
    }, [invoices.length]);

    // This method will delete a invoice
    async function deleteInvoice(id) {
        console.log(id)
        await fetch(`http://localhost:8080/invoices/${id}`, {
            method: "DELETE"
        });

        const newRecords = invoices.filter((el) => el._id !== id);
        setInvoices(newRecords);
    }

    // This method will map out the invoices on the table
    function invoiceList() {
        return invoices.map((invoice) => {
            return (
                <Invoice
                    invoice={invoice}
                    deleteInvoice={() => deleteInvoice(invoice._id)}
                    key={invoice._id}
                />
            );
        });
    }

    // This following section will display the table with the invoices of individuals.
    return (
        <div>
            <HeaderResponsive />
            <div style={{ margin: "100px",  alignItems: "center"}}>
            <Group position="apart" mt="md" mb="xs">
                <Link to={`/home`}><Button>{t("Home")}</Button></Link>
                <Link to={`/create`}><Button>{t("+ Add Invoice")}</Button></Link>
            </Group>
            <Card shadow="sm" padding="lg" radius="md" withBorder>
                <Table >
                    <thead>
                        <tr>
                            <th>{t("IssueDate")}</th>
                            <th>{t("DueDate")}</th>
                            <th>{t("PayableAmount")}</th>
                            <th>{t("BuyerRef")}</th>
                            <th>{t("SalesOrderId")}</th>
                            <th>{t("Edit")}</th>
                            <th>{t("Delete")}</th>
                        </tr>
                    </thead>
                    <tbody>{invoiceList()}</tbody>
                </Table>
            </Card>
            </div>
        </div >
    );
}