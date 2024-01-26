import React, { useState } from "react";
import { Group, Button, Container, TextInput, NumberInput } from "@mantine/core";
import { DateInput } from '@mantine/dates';
import { useNavigate } from "react-router-dom"; // Replace useHistory with useNavigate
import { useTranslation } from 'react-i18next';
import { HeaderMegaMenu } from "./website/databaseHeader";
import { FooterCentered } from "./website/websiteFooter";
import { useSearchParams } from 'react-router-dom';
import { format } from "date-fns";
const links = require("./website/links.json")["links"];


// IssueDate: req.body.Invoice["cbc:IssueDate"]._text,
// DueDate: req.body.Invoice["cbc:DueDate"]._text,
// PayableAmount:
//   req.body.Invoice["cac:LegalMonetaryTotal"]["cbc:PayableAmount"]._text,
// BuyerRef: req.body.Invoice["cbc:BuyerReference"]._text,
// SalesOrderId:
//   req.body.Invoice["cac:OrderReference"]["cbc:SalesOrderID"]._text,
// XMLfile: req.body.Invoice,
// Decleration: req.body._declaration,

export default function Upload() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [invoice, setInvoice] = useState({});
    const [searchparams] = useSearchParams();

    const [formData, setFormData] = useState({
        issueDate: "",
        dueDate: "",
        buyerReference: "",
        payableAmount: "",
        salesOrderId: ""
    });

    const handleChange = (event) => {
        const { name, value } = event.currentTarget;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const formattedIssueDate = format(new Date(formData.issueDate), "yyyy-MM-dd");
        const formattedDueDate = format(new Date(formData.dueDate), "yyyy-MM-dd");
        

        // Handle form submission logic here
        console.log(formData);
        const invoiceObject = {
            "Username": searchparams.get("id"),
            "_declaration": {
                "_attributes": {
                    "version": "1.0",
                    "encoding": "UTF-8"
                }
            },
            "Invoice": {
                "_attributes": {
                    "xmlns:cac": "urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2",
                    "xmlns:cbc": "urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2",
                    "xmlns": "urn:oasis:names:specification:ubl:schema:xsd:Invoice-2"
                },
                "cbc:CustomizationID": {
                    "_text": "urn:cen.eu:en16931:2017#conformant#urn:fdc:peppol.eu:2017:poacc:billing:international:aunz:3.0"
                },
                "cbc:ProfileID": {
                    "_text": "urn:fdc:peppol.eu:2017:poacc:billing:01:1.0"
                },
                "cbc:ID": {
                    "_text": "Invoice01"
                },
                "cbc:IssueDate": { 
                    "_text": formattedIssueDate
                },
                "cbc:DueDate": {
                    "_text": formattedDueDate
                },
                "cbc:InvoiceTypeCode": {
                    "_text": "380"
                },
                "cbc:Note": {
                    "_text": "Tax invoice"
                },
                "cbc:DocumentCurrencyCode": {
                    "_text": "AUD"
                },
                "cbc:AccountingCost": {
                    "_text": "4025:123:4343"
                },
                "cbc:BuyerReference": {
                    "_text": formData.buyerReference
                },
                "cac:InvoicePeriod": {
                    "cbc:StartDate": {
                        "_text": "2019-06-01"
                    },
                    "cbc:EndDate": {
                        "_text": "2019-07-30"
                    }
                },
                "cac:OrderReference": {
                    "cbc:ID": {
                        "_text": "PurchaseOrderReference"
                    },
                    "cbc:SalesOrderID": {
                        "_text": formData.salesOrderId
                    }
                },
                "cac:BillingReference": {
                    "cac:InvoiceDocumentReference": {
                        "cbc:ID": {
                            "_text": "PrecedingInvoiceReference"
                        },
                        "cbc:IssueDate": {
                            "_text": "2019-05-30"
                        }
                    }
                },
                "cac:DespatchDocumentReference": {
                    "cbc:ID": {
                        "_text": "DDR-REF"
                    }
                },
                "cac:ReceiptDocumentReference": {
                    "cbc:ID": {
                        "_text": "RD-REF"
                    }
                },
                "cac:OriginatorDocumentReference": {
                    "cbc:ID": {
                        "_text": "OD-REF"
                    }
                },
                "cac:ContractDocumentReference": {
                    "cbc:ID": {
                        "_text": "CD-REF"
                    }
                },
                "cac:AccountingSupplierParty": {
                    "cac:Party": {
                        "cbc:EndpointID": {
                            "_attributes": {
                                "schemeID": "0151"
                            },
                            "_text": "47555222000"
                        },
                        "cac:PartyIdentification": {
                            "cbc:ID": {
                                "_text": "47555222000"
                            }
                        },
                        "cac:PartyName": {
                            "cbc:Name": {
                                "_text": "Supplier Trading Name Ltd"
                            }
                        },
                        "cac:PostalAddress": {
                            "cbc:StreetName": {
                                "_text": "Main street 1"
                            },
                            "cbc:AdditionalStreetName": {
                                "_text": "Postbox 123"
                            },
                            "cbc:CityName": {
                                "_text": "Harrison"
                            },
                            "cbc:PostalZone": {
                                "_text": "2912"
                            },
                            "cac:Country": {
                                "cbc:IdentificationCode": {
                                    "_text": "AU"
                                }
                            }
                        },
                        "cac:PartyTaxScheme": {
                            "cbc:CompanyID": {
                                "_text": "47555222000"
                            },
                            "cac:TaxScheme": {
                                "cbc:ID": {
                                    "_text": "GST"
                                }
                            }
                        },
                        "cac:PartyLegalEntity": {
                            "cbc:RegistrationName": {
                                "_text": "Supplier Official Name Ltd"
                            },
                            "cbc:CompanyID": {
                                "_attributes": {
                                    "schemeID": "0151"
                                },
                                "_text": "47555222000"
                            },
                            "cbc:CompanyLegalForm": {
                                "_text": "Partnership"
                            }
                        },
                        "cac:Contact": {
                            "cbc:Name": {
                                "_text": "Ronald MacDonald"
                            },
                            "cbc:Telephone": {
                                "_text": "Mobile 0430123456"
                            },
                            "cbc:ElectronicMail": {
                                "_text": "ronald.macdonald@qualitygoods.com.au"
                            }
                        }
                    }
                },
                "cac:AccountingCustomerParty": {
                    "cac:Party": {
                        "cbc:EndpointID": {
                            "_attributes": {
                                "schemeID": "0151"
                            },
                            "_text": "91888222000"
                        },
                        "cac:PartyIdentification": {
                            "cbc:ID": {
                                "_attributes": {
                                    "schemeID": "0151"
                                },
                                "_text": "91888222000"
                            }
                        },
                        "cac:PartyName": {
                            "cbc:Name": {
                                "_text": "Trotters Trading Co Ltd"
                            }
                        },
                        "cac:PostalAddress": {
                            "cbc:StreetName": {
                                "_text": "100 Queen Street"
                            },
                            "cbc:AdditionalStreetName": {
                                "_text": "Po box 878"
                            },
                            "cbc:CityName": {
                                "_text": "Sydney"
                            },
                            "cbc:PostalZone": {
                                "_text": "2000"
                            },
                            "cac:Country": {
                                "cbc:IdentificationCode": {
                                    "_text": "AU"
                                }
                            }
                        },
                        "cac:PartyTaxScheme": {
                            "cbc:CompanyID": {
                                "_text": "91888222000"
                            },
                            "cac:TaxScheme": {
                                "cbc:ID": {
                                    "_text": "GST"
                                }
                            }
                        },
                        "cac:PartyLegalEntity": {
                            "cbc:RegistrationName": {
                                "_text": "Buyer Official Name"
                            },
                            "cbc:CompanyID": {
                                "_attributes": {
                                    "schemeID": "0151"
                                },
                                "_text": "91888222000"
                            }
                        },
                        "cac:Contact": {
                            "cbc:Name": {
                                "_text": "Lisa Johnson"
                            },
                            "cbc:Telephone": {
                                "_text": "0261234567"
                            },
                            "cbc:ElectronicMail": {
                                "_text": "lj@buyer.com.au"
                            }
                        }
                    }
                },
                "cac:PayeeParty": {
                    "cac:PartyIdentification": {
                        "cbc:ID": {
                            "_text": "91888222000"
                        }
                    },
                    "cac:PartyName": {
                        "cbc:Name": {
                            "_text": "Mr Anderson"
                        }
                    },
                    "cac:PartyLegalEntity": {
                        "cbc:CompanyID": {
                            "_attributes": {
                                "schemeID": "0151"
                            },
                            "_text": "91888222000"
                        }
                    }
                },
                "cac:TaxRepresentativeParty": {
                    "cac:PartyName": {
                        "cbc:Name": {
                            "_text": "Mr Wilson"
                        }
                    },
                    "cac:PostalAddress": {
                        "cbc:StreetName": {
                            "_text": "16 Stout Street"
                        },
                        "cbc:AdditionalStreetName": {
                            "_text": "Po box 878"
                        },
                        "cbc:CityName": {
                            "_text": "Sydney"
                        },
                        "cbc:PostalZone": {
                            "_text": "2000"
                        },
                        "cbc:CountrySubentity": {
                            "_text": "NSW"
                        },
                        "cac:AddressLine": {
                            "cbc:Line": {
                                "_text": "Unit 1"
                            }
                        },
                        "cac:Country": {
                            "cbc:IdentificationCode": {
                                "_text": "AU"
                            }
                        }
                    },
                    "cac:PartyTaxScheme": {
                        "cbc:CompanyID": {
                            "_text": "91888222000"
                        },
                        "cac:TaxScheme": {
                            "cbc:ID": {
                                "_text": "GST"
                            }
                        }
                    }
                },
                "cac:Delivery": {
                    "cbc:ActualDeliveryDate": {
                        "_text": "2019-07-01"
                    },
                    "cac:DeliveryLocation": {
                        "cbc:ID": {
                            "_attributes": {
                                "schemeID": "0151"
                            },
                            "_text": "91888222000"
                        },
                        "cac:Address": {
                            "cbc:StreetName": {
                                "_text": "Delivery street 2"
                            },
                            "cbc:AdditionalStreetName": {
                                "_text": "Building 56"
                            },
                            "cbc:CityName": {
                                "_text": "Sydney"
                            },
                            "cbc:PostalZone": {
                                "_text": "2000"
                            },
                            "cbc:CountrySubentity": {
                                "_text": "NSW"
                            },
                            "cac:AddressLine": {
                                "cbc:Line": {
                                    "_text": "Unit 1"
                                }
                            },
                            "cac:Country": {
                                "cbc:IdentificationCode": {
                                    "_text": "AU"
                                }
                            }
                        }
                    },
                    "cac:DeliveryParty": {
                        "cac:PartyName": {
                            "cbc:Name": {
                                "_text": "Delivery party Name"
                            }
                        }
                    }
                },
                "cac:PaymentMeans": {
                    "cbc:PaymentMeansCode": {
                        "_attributes": {
                            "name": "Credit transfer"
                        },
                        "_text": "30"
                    },
                    "cbc:PaymentID": {
                        "_text": "PaymentReferenceText"
                    },
                    "cac:PayeeFinancialAccount": {
                        "cbc:ID": {
                            "_text": "AccountNumber"
                        },
                        "cbc:Name": {
                            "_text": "AccountName"
                        },
                        "cac:FinancialInstitutionBranch": {
                            "cbc:ID": {
                                "_text": "BSB Number"
                            }
                        }
                    }
                },
                "cac:PaymentTerms": {
                    "cbc:Note": {
                        "_text": "Payment within 30 days"
                    }
                },
                "cac:AllowanceCharge": {
                    "cbc:ChargeIndicator": {
                        "_text": "true"
                    },
                    "cbc:AllowanceChargeReasonCode": {
                        "_text": "SAA"
                    },
                    "cbc:AllowanceChargeReason": {
                        "_text": "Shipping and Handling"
                    },
                    "cbc:MultiplierFactorNumeric": {
                        "_text": "0"
                    },
                    "cbc:Amount": {
                        "_attributes": {
                            "currencyID": "AUD"
                        },
                        "_text": "0"
                    },
                    "cbc:BaseAmount": {
                        "_attributes": {
                            "currencyID": "AUD"
                        },
                        "_text": "0"
                    },
                    "cac:TaxCategory": {
                        "cbc:ID": {
                            "_text": "S"
                        },
                        "cbc:Percent": {
                            "_text": "10"
                        },
                        "cac:TaxScheme": {
                            "cbc:ID": {
                                "_text": "GST"
                            }
                        }
                    }
                },
                "cac:TaxTotal": {
                    "cbc:TaxAmount": {
                        "_attributes": {
                            "currencyID": "AUD"
                        },
                        "_text": "148.74"
                    },
                    "cac:TaxSubtotal": {
                        "cbc:TaxableAmount": {
                            "_attributes": {
                                "currencyID": "AUD"
                            },
                            "_text": "1487.40"
                        },
                        "cbc:TaxAmount": {
                            "_attributes": {
                                "currencyID": "AUD"
                            },
                            "_text": "148.74"
                        },
                        "cac:TaxCategory": {
                            "cbc:ID": {
                                "_text": "S"
                            },
                            "cbc:Percent": {
                                "_text": "10"
                            },
                            "cac:TaxScheme": {
                                "cbc:ID": {
                                    "_text": "GST"
                                }
                            }
                        }
                    }
                },
                "cac:LegalMonetaryTotal": {
                    "cbc:LineExtensionAmount": {
                        "_attributes": {
                            "currencyID": "AUD"
                        },
                        "_text": "1487.40"
                    },
                    "cbc:TaxExclusiveAmount": {
                        "_attributes": {
                            "currencyID": "AUD"
                        },
                        "_text": "1487.40"
                    },
                    "cbc:TaxInclusiveAmount": {
                        "_attributes": {
                            "currencyID": "AUD"
                        },
                        "_text": "1636.14"
                    },
                    "cbc:ChargeTotalAmount": {
                        "_attributes": {
                            "currencyID": "AUD"
                        },
                        "_text": "0.00"
                    },
                    "cbc:PrepaidAmount": {
                        "_attributes": {
                            "currencyID": "AUD"
                        },
                        "_text": "0.00"
                    },
                    "cbc:PayableAmount": {
                        "_attributes": {
                            "currencyID": "AUD"
                        },
                        "_text": formData.payableAmount
                    }
                },
                "cac:InvoiceLine": [
                    {
                        "cbc:ID": {
                            "_text": "1"
                        },
                        "cbc:Note": {
                            "_text": "Texts Giving More Info about the Invoice Line"
                        },
                        "cbc:InvoicedQuantity": {
                            "_attributes": {
                                "unitCode": "E99"
                            },
                            "_text": "10"
                        },
                        "cbc:LineExtensionAmount": {
                            "_attributes": {
                                "currencyID": "AUD"
                            },
                            "_text": "299.90"
                        },
                        "cbc:AccountingCost": {
                            "_text": "Consulting Fees"
                        },
                        "cac:InvoicePeriod": {
                            "cbc:StartDate": {
                                "_text": "2019-06-01"
                            },
                            "cbc:EndDate": {
                                "_text": "2019-07-30"
                            }
                        },
                        "cac:OrderLineReference": {
                            "cbc:LineID": {
                                "_text": "123"
                            }
                        },
                        "cac:DocumentReference": {
                            "cbc:ID": {
                                "_attributes": {
                                    "schemeID": "HWB"
                                },
                                "_text": "9000074677"
                            },
                            "cbc:DocumentTypeCode": {
                                "_text": "130"
                            }
                        },
                        "cac:Item": {
                            "cbc:Description": {
                                "_text": "Widgets True and Fair"
                            },
                            "cbc:Name": {
                                "_text": "True-Widgets"
                            },
                            "cac:BuyersItemIdentification": {
                                "cbc:ID": {
                                    "_text": "W659590"
                                }
                            },
                            "cac:SellersItemIdentification": {
                                "cbc:ID": {
                                    "_text": "WG546767"
                                }
                            },
                            "cac:StandardItemIdentification": {
                                "cbc:ID": {
                                    "_attributes": {
                                        "schemeID": "0002"
                                    },
                                    "_text": "WG546767"
                                }
                            },
                            "cac:OriginCountry": {
                                "cbc:IdentificationCode": {
                                    "_text": "AU"
                                }
                            },
                            "cac:CommodityClassification": {
                                "cbc:ItemClassificationCode": {
                                    "_attributes": {
                                        "listID": "SRV"
                                    },
                                    "_text": "09348023"
                                }
                            },
                            "cac:ClassifiedTaxCategory": {
                                "cbc:ID": {
                                    "_text": "S"
                                },
                                "cbc:Percent": {
                                    "_text": "10"
                                },
                                "cac:TaxScheme": {
                                    "cbc:ID": {
                                        "_text": "GST"
                                    }
                                }
                            }
                        },
                        "cac:Price": {
                            "cbc:PriceAmount": {
                                "_attributes": {
                                    "currencyID": "AUD"
                                },
                                "_text": "29.99"
                            },
                            "cac:AllowanceCharge": {
                                "cbc:ChargeIndicator": {
                                    "_text": "false"
                                },
                                "cbc:Amount": {
                                    "_attributes": {
                                        "currencyID": "AUD"
                                    },
                                    "_text": "0.00"
                                },
                                "cbc:BaseAmount": {
                                    "_attributes": {
                                        "currencyID": "AUD"
                                    },
                                    "_text": "29.99"
                                }
                            }
                        }
                    },
                    {
                        "cbc:ID": {
                            "_text": "2"
                        },
                        "cbc:InvoicedQuantity": {
                            "_attributes": {
                                "unitCode": "DAY"
                            },
                            "_text": "2"
                        },
                        "cbc:LineExtensionAmount": {
                            "_attributes": {
                                "currencyID": "AUD"
                            },
                            "_text": "1000"
                        },
                        "cac:OrderLineReference": {
                            "cbc:LineID": {
                                "_text": "123"
                            }
                        },
                        "cac:Item": {
                            "cbc:Description": {
                                "_text": "Description 2"
                            },
                            "cbc:Name": {
                                "_text": "item name 2"
                            },
                            "cac:StandardItemIdentification": {
                                "cbc:ID": {
                                    "_attributes": {
                                        "schemeID": "0151"
                                    },
                                    "_text": "21382183120983"
                                }
                            },
                            "cac:OriginCountry": {
                                "cbc:IdentificationCode": {
                                    "_text": "NO"
                                }
                            },
                            "cac:CommodityClassification": {
                                "cbc:ItemClassificationCode": {
                                    "_attributes": {
                                        "listID": "SRV"
                                    },
                                    "_text": "09348023"
                                }
                            },
                            "cac:ClassifiedTaxCategory": {
                                "cbc:ID": {
                                    "_text": "S"
                                },
                                "cbc:Percent": {
                                    "_text": "10"
                                },
                                "cac:TaxScheme": {
                                    "cbc:ID": {
                                        "_text": "GST"
                                    }
                                }
                            }
                        },
                        "cac:Price": {
                            "cbc:PriceAmount": {
                                "_attributes": {
                                    "currencyID": "AUD"
                                },
                                "_text": "500"
                            }
                        }
                    },
                    {
                        "cbc:ID": {
                            "_text": "3"
                        },
                        "cbc:Note": {
                            "_text": "Invoice Line Description"
                        },
                        "cbc:InvoicedQuantity": {
                            "_attributes": {
                                "unitCode": "M66"
                            },
                            "_text": "25"
                        },
                        "cbc:LineExtensionAmount": {
                            "_attributes": {
                                "currencyID": "AUD"
                            },
                            "_text": "187.50"
                        },
                        "cbc:AccountingCost": {
                            "_text": "Consulting Fees"
                        },
                        "cac:InvoicePeriod": {
                            "cbc:StartDate": {
                                "_text": "2019-06-01"
                            },
                            "cbc:EndDate": {
                                "_text": "2019-07-30"
                            }
                        },
                        "cac:OrderLineReference": {
                            "cbc:LineID": {
                                "_text": "123"
                            }
                        },
                        "cac:DocumentReference": {
                            "cbc:ID": {
                                "_attributes": {
                                    "schemeID": "HWB"
                                },
                                "_text": "9000074677"
                            },
                            "cbc:DocumentTypeCode": {
                                "_text": "130"
                            }
                        },
                        "cac:Item": {
                            "cbc:Description": {
                                "_text": "Widgets True and Fair"
                            },
                            "cbc:Name": {
                                "_text": "True-Widgets"
                            },
                            "cac:BuyersItemIdentification": {
                                "cbc:ID": {
                                    "_text": "W659590"
                                }
                            },
                            "cac:SellersItemIdentification": {
                                "cbc:ID": {
                                    "_text": "WG546767"
                                }
                            },
                            "cac:StandardItemIdentification": {
                                "cbc:ID": {
                                    "_attributes": {
                                        "schemeID": "0151"
                                    },
                                    "_text": "WG546767"
                                }
                            },
                            "cac:OriginCountry": {
                                "cbc:IdentificationCode": {
                                    "_text": "AU"
                                }
                            },
                            "cac:CommodityClassification": {
                                "cbc:ItemClassificationCode": {
                                    "_attributes": {
                                        "listID": "SRV"
                                    },
                                    "_text": "09348023"
                                }
                            },
                            "cac:ClassifiedTaxCategory": {
                                "cbc:ID": {
                                    "_text": "S"
                                },
                                "cbc:Percent": {
                                    "_text": "10"
                                },
                                "cac:TaxScheme": {
                                    "cbc:ID": {
                                        "_text": "GST"
                                    }
                                }
                            }
                        },
                        "cac:Price": {
                            "cbc:PriceAmount": {
                                "_attributes": {
                                    "currencyID": "AUD"
                                },
                                "_text": "7.50"
                            },
                            "cac:AllowanceCharge": {
                                "cbc:ChargeIndicator": {
                                    "_text": "false"
                                },
                                "cbc:Amount": {
                                    "_attributes": {
                                        "currencyID": "AUD"
                                    },
                                    "_text": "0.00"
                                },
                                "cbc:BaseAmount": {
                                    "_attributes": {
                                        "currencyID": "AUD"
                                    },
                                    "_text": "7.50"
                                }
                            }
                        }
                    }
                ]
            }
        }
        setInvoice(JSON.stringify(invoiceObject));
        createInvoice();
    };

    async function createInvoice() {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var raw = invoice;
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("http://localhost:8080/invoices/create", requestOptions)
            .then(response => response.text())
            .then(result => {
                console.log(result)
                window.alert(result);
            }
            )
            .catch(error => console.log('error', error));
    }


    function handleBackButtonClick() { // Add this function to handle back button click
        navigate(-1); // Use navigate(-1) to go back
    }


    return (
        <Container py="md">
            <div>
                <HeaderMegaMenu />
                <form onSubmit={handleSubmit}>
                    <DateInput
                        label={t("Issue Date")}
                        name="issueDate"
                        value={formData.issueDate}
                        onChange={(value) => setFormData((prevFormData) => ({ ...prevFormData, issueDate: value }))}
                        required
                        style={{ marginBottom: "16px" }}
                    />
                    <DateInput
                        label={t("Due Date")}
                        name="dueDate"
                        value={formData.dueDate}
                        onChange={(value) => setFormData((prevFormData) => ({ ...prevFormData, dueDate: value }))}
                        required
                        style={{ marginBottom: "16px" }}
                    />
                    <TextInput
                        label={t("Buyer Reference")}
                        placeholder={t("Enter buyer reference")}
                        name="buyerReference"
                        value={formData.buyerReference}
                        onChange={handleChange}
                        required
                        style={{ marginBottom: "16px" }}
                    />
                    <TextInput
                        label={t("Payable Amount")}
                        placeholder={t("Enter payable amount")}
                        name="payableAmount"
                        value={formData.payableAmount}
                        onChange={handleChange}
                        required
                        style={{ marginBottom: "16px" }}
                    />
                    <TextInput
                        label={t("Sales Order ID")}
                        placeholder={t("Enter sales order ID")}
                        name="salesOrderId"
                        value={formData.salesOrderId}
                        onChange={handleChange}
                        required
                        style={{ marginBottom: "16px" }}
                    />
                    <div style={{ display: "flex", justifyContent: "flex-end" }}>
                        <Button type="submit">{t("Create Invoice")}</Button>
                    </div>
                </form>


                <Group position="right" mt="md">
                    <Button onClick={handleBackButtonClick}>{t("Back")}</Button>
                </Group>
                <FooterCentered links={links} />
            </div>
        </Container>
    );
}