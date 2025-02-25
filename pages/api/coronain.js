const fetch = require('isomorphic-unfetch');
const cheerio = require('cheerio');
const url = 'https://www.mohfw.gov.in';
const statesName = ["Andaman and Nicobar Islands", "Andhra Pradesh", "Telengana", "Arunachal Pradesh", "Assam", "Bihar", "Chandigarh", "Chhattisgarh", "Dadra and Nagar Haveli", "Daman and Diu", "Delhi", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jammu and Kashmir", "Jammu", "Kashmir", "Jharkhand", "Karnataka", "Kerala", "Ladakh", "Lakshadweep", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Puducherry", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"];
let inMemeory = {};
const fetchData = async () => {
    try {
        const response = await fetch(url)
        const html = await response.text();
        const $ = cheerio.load(html);
        const latestUpdateTable = $('tr', 'div.table-responsive > table > tbody');
        const statsTable = $('tbody > tr', '.data-table.table-responsive > table');
        const dataCoronaDetails = {};
        const coronaData = [];
        if ($("p:contains(*Total number of confirmed cases so far in the cou)")) {
            dataCoronaDetails['Note'] = $("p:contains(*Total number of confirmed cases so far in the cou)").text();
        }
        dataCoronaDetails["Totalinfo"] = {
            "active_cases": $("span:contains(Active Cases)").siblings("strong").text().replace(/,/g, '')
        }
        let updateData = [];
        latestUpdateTable.each(function (i) {
            const tds = $(this).find('td');
            if (tds.length === 2) {
                const date = $(tds).eq(0).text();
                const title = $('a', tds).eq(0).text();
                const href = $('a', tds).attr('href');
                updateData.push({ date, title, href });
            }

        })
        statsTable.each(function (i) {
            const tds = $(this).find('td');
            if (tds.length === 4) {
                dataCoronaDetails['Total'] = {
                    'Total_Confirmed_cases': ($('strong', tds).eq(1).text() || '').replace(/,/g, ''),
                    'Cured/Discharged/Migrated': ($('strong', tds).eq(2).text() || '').replace(/,/g, ''),
                    death: ($('strong', tds).eq(3).text() || '').replace(/,/g, '')
                }
            } else {
                const rowData = {
                    SL: 0, namestateorut: '', totalConfirmcase: 0,
                    'Cured/Discharged/Migrated': 0, death: 0
                };
                const stateName = ($(tds).eq(1).text() || '').trim();
                if (statesName.includes(stateName)) {
                    rowData['SL'] = Number(($(tds).eq(0).text() || '').replace(/,/g, ''));
                    rowData['namestateorut'] = $(tds).eq(1).text();
                    const c1 = Number(($(tds).eq(2).text() || '').replace(/,/g, ''));
                   // const c2 = Number(($(tds).eq(3).text() || '').replace(/,/g, ''));
                    rowData['totalConfirmcase'] = c1; //{ indian: c1, Foreigner: c2 };
                    rowData['Cured/Discharged/Migrated'] = Number(($(tds).eq(3).text() || '').replace(/,/g, ''));
                    rowData['death'] = Number(($(tds).eq(4).text() || '').replace(/,/g, ''));
                    coronaData.push(rowData);
                }
            }
        });
        dataCoronaDetails['effected states'] = coronaData;
        dataCoronaDetails["latest_update"] = updateData;
        dataCoronaDetails['Datasourceurl'] = 'https://www.mohfw.gov.in';
        dataCoronaDetails['Lastupdated'] = $("div.status-update > h2 > span").text();
        inMemeory = dataCoronaDetails;
        return dataCoronaDetails;
    }
    catch (err) {
        console.log(err);
        return inMemeory;
    };
}


export default async (req, res) => {
    const data = await fetchData();
    res.status(200).json(data)
  }