import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';

import { GlobalVariable } from '../../global';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class OutletMasterService {

	url: string;
	private headers: Headers;
	private options: RequestOptions;

	constructor(private http: Http) {
		this.url = `${GlobalVariable.BASE_API_URL}/outlets`;
		this.headers = new Headers({
			'Content-Type': 'application/json'	
		});
		this.options = new RequestOptions({headers: this.headers});
	}

	all(): Promise<any[]> {
		return this.http.get(this.url).toPromise().then((response) => {
			return response.json();
		});
		// return Promise.resolve(true).then(() => {
		// 	return Outlets;
		// });
	}

	get(id: number): Promise<any> {
		return this.http.get(`${this.url}/${id}`).toPromise().then((response) => {
			return response.json();
		});
	}

	create(outlet: any): Promise<any> {
		return this.http.post(this.url, outlet, this.options).toPromise().then((response) => {
			return response;
		});
	}

	update(outlet: any): Promise<number> {
		return this.http.put(`${this.url}/${outlet.uid}`, outlet).toPromise().then((response) => {
			return response.status;
		});
	}

	remove(id: string): Promise<number> {
		return this.http.delete(`${this.url}/${id}`).toPromise().then((response) => {
			return response.status;
		});
	}

	areas(): Promise<any[]> {
		return this.http.get(`${this.url}/geographicalarea`).toPromise().then((response) => {
			return response.json();
		});
	}

	classes(): Promise<any[]> {
		return this.http.get(`${this.url}/getclass`).toPromise().then((response) => {
			return response.json();
		});
	}
}



export var Outlets: any[] = [
	{
		"Uid": 40,
		"Id": "15",
		"RegistrationNumber": "",
		"Name": "7E - BAY FRONT AVENUE",
		"CustomerUid": 5,
		"StreetAddress": "1 BAY FRONT AVENUE #B2-01 THE SHOPPES AT MARINA BAY SANDS SINGAPORE",
		"ExpiryDate": null,
		"ClassUid": 4477,
		"TownUid": 58,
		"VisitFrequency": 0,
		"DistrictUid": 57,
		"ProvinceUid": 11,
		"Type": null,
		"Group": null,
		"SubTown": null,
		"Town": "Marina Bay",
		"District": "South West",
		"Province": "West Region",
		"Class": "Supermarket",
		"Customer": "7Eleven",
		"IsActive": 1
	},
	{
		"Uid": 41,
		"Id": "16",
		"RegistrationNumber": "",
		"Name": "7E - BLK 4 LEVEL 1",
		"CustomerUid": 5,
		"StreetAddress": "BLK 4 LEVEL 1 SINGAPORE GENERAL HOSPITAL OUTRAM ROAD SINGAPORE",
		"ExpiryDate": null,
		"ClassUid": 4477,
		"TownUid": 58,
		"VisitFrequency": 0,
		"DistrictUid": 57,
		"ProvinceUid": 11,
		"Type": null,
		"Group": null,
		"SubTown": null,
		"Town": "Marina Bay",
		"District": "South West",
		"Province": "West Region",
		"Class": "Supermarket",
		"Customer": "7Eleven",
		"IsActive": 1
	},
	{
		"Uid": 42,
		"Id": "17",
		"RegistrationNumber": "",
		"Name": "Ang Mo Supermarket",
		"CustomerUid": 13,
		"StreetAddress": "407 ANG MO KIO AVE 10 SINGAPORE",
		"ExpiryDate": null,
		"ClassUid": 4475,
		"TownUid": 61,
		"VisitFrequency": 0,
		"DistrictUid": 60,
		"ProvinceUid": 3,
		"Type": null,
		"Group": null,
		"SubTown": null,
		"Town": "Balestier",
		"District": "Central East",
		"Province": "Central Region",
		"Class": "%s%s%08da",
		"Customer": "Ang Mo Supermarket",
		"IsActive": 1
	},
	{
		"Uid": 43,
		"Id": "18",
		"RegistrationNumber": "",
		"Name": "Cheers - 11 JALAN TAN",
		"CustomerUid": 9,
		"StreetAddress": "11 JALAN TAN TOCK SENG #01-03 SINGAPORE",
		"ExpiryDate": null,
		"ClassUid": 4477,
		"TownUid": 62,
		"VisitFrequency": 0,
		"DistrictUid": 60,
		"ProvinceUid": 3,
		"Type": null,
		"Group": null,
		"SubTown": null,
		"Town": "Novena",
		"District": "Central East",
		"Province": "Central Region",
		"Class": "Supermarket",
		"Customer": "Cheers",
		"IsActive": 1
	},
	{
		"Uid": 44,
		"Id": "19",
		"RegistrationNumber": "",
		"Name": "Cheers - 1 SOPHIA ROAD",
		"CustomerUid": 9,
		"StreetAddress": "1 SOPHIA ROAD #01-18 PEACE CENTRE SINGAPORE",
		"ExpiryDate": null,
		"ClassUid": 4475,
		"TownUid": 63,
		"VisitFrequency": 0,
		"DistrictUid": 57,
		"ProvinceUid": 11,
		"Type": null,
		"Group": null,
		"SubTown": null,
		"Town": "Rochor",
		"District": "South West",
		"Province": "West Region",
		"Class": "%s%s%08da",
		"Customer": "Cheers",
		"IsActive": 1
	},
	{
		"Uid": 45,
		"Id": "20",
		"RegistrationNumber": "",
		"Name": "Cold Storage Compass One",
		"CustomerUid": 7,
		"StreetAddress": "1 SENGKANG SQUARE #B1-25 SINGAPORE",
		"ExpiryDate": null,
		"ClassUid": 4475,
		"TownUid": 45,
		"VisitFrequency": 0,
		"DistrictUid": 29,
		"ProvinceUid": 28,
		"Type": null,
		"Group": null,
		"SubTown": null,
		"Town": "Serangoon Garden",
		"District": "North East",
		"Province": "North Region",
		"Class": "%s%s%08da",
		"Customer": "Cold Storage",
		"IsActive": 1
	},
	{
		"Uid": 46,
		"Id": "21",
		"RegistrationNumber": "",
		"Name": "Cold Storage North Point",
		"CustomerUid": 7,
		"StreetAddress": "930 YISHUN AVE 2 #B1-11 TO 16 NORTHPOINT SHOPPING CENTRE SINGAPORE",
		"ExpiryDate": null,
		"ClassUid": 4477,
		"TownUid": 56,
		"VisitFrequency": 0,
		"DistrictUid": 55,
		"ProvinceUid": 28,
		"Type": null,
		"Group": null,
		"SubTown": null,
		"Town": "Yishun",
		"District": "North West",
		"Province": "North Region",
		"Class": "Supermarket",
		"Customer": "Cold Storage",
		"IsActive": 1
	},
	{
		"Uid": 47,
		"Id": "22",
		"RegistrationNumber": "",
		"Name": "FairPrice Express",
		"CustomerUid": 6,
		"StreetAddress": "239 / 255 EAST COAST ROAD SINGAPORE",
		"ExpiryDate": null,
		"ClassUid": 4475,
		"TownUid": 50,
		"VisitFrequency": 0,
		"DistrictUid": 9,
		"ProvinceUid": 7,
		"Type": null,
		"Group": null,
		"SubTown": null,
		"Town": "Bedok",
		"District": "Upper East Coast",
		"Province": "East Region",
		"Class": "%s%s%08da",
		"Customer": "Fairprice",
		"IsActive": 1
	},
	{
		"Uid": 48,
		"Id": "2",
		"RegistrationNumber": "",
		"Name": "FP AMK Hub Hyper",
		"CustomerUid": 6,
		"StreetAddress": "53 ANG MO KIO AVE 3 ANG MO KIO HUB #B2-26 SINGAPORE",
		"ExpiryDate": null,
		"ClassUid": 4475,
		"TownUid": 44,
		"VisitFrequency": 0,
		"DistrictUid": 4,
		"ProvinceUid": 3,
		"Type": null,
		"Group": null,
		"SubTown": null,
		"Town": "Ang Mo Kio",
		"District": "Central North",
		"Province": "Central Region",
		"Class": "%s%s%08da",
		"Customer": "Fairprice",
		"IsActive": 1
	},
	{
		"Uid": 49,
		"Id": "7",
		"RegistrationNumber": "",
		"Name": "FP Bedok North A",
		"CustomerUid": 6,
		"StreetAddress": "212 BEDOK NORTH STREET 1 #01-147 SINGAPORE",
		"ExpiryDate": null,
		"ClassUid": 4477,
		"TownUid": 50,
		"VisitFrequency": 0,
		"DistrictUid": 9,
		"ProvinceUid": 7,
		"Type": null,
		"Group": null,
		"SubTown": null,
		"Town": "Bedok",
		"District": "Upper East Coast",
		"Province": "East Region",
		"Class": "Supermarket",
		"Customer": "Fairprice",
		"IsActive": 1
	},
	{
		"Uid": 50,
		"Id": "5",
		"RegistrationNumber": "",
		"Name": "FP Hougang One",
		"CustomerUid": 6,
		"StreetAddress": "1 HOUGANG STREET 91 SINGAPORE",
		"ExpiryDate": null,
		"ClassUid": 4477,
		"TownUid": 47,
		"VisitFrequency": 0,
		"DistrictUid": 29,
		"ProvinceUid": 28,
		"Type": null,
		"Group": null,
		"SubTown": null,
		"Town": "Hougang",
		"District": "North East",
		"Province": "North Region",
		"Class": "Supermarket",
		"Customer": "Fairprice",
		"IsActive": 1
	},
	{
		"Uid": 51,
		"Id": "1",
		"RegistrationNumber": "",
		"Name": "FP Jurong Point Hyper",
		"CustomerUid": 6,
		"StreetAddress": "1 JURONG WEST CENTRAL 2 #03-07 JURONG POINT SHOPPING CENTRE SINGAPORE",
		"ExpiryDate": null,
		"ClassUid": 4475,
		"TownUid": 43,
		"VisitFrequency": 0,
		"DistrictUid": 42,
		"ProvinceUid": 11,
		"Type": null,
		"Group": null,
		"SubTown": null,
		"Town": "Jurong",
		"District": "Far West",
		"Province": "West Region",
		"Class": "%s%s%08da",
		"Customer": "Fairprice",
		"IsActive": 1
	},
	{
		"Uid": 52,
		"Id": "3",
		"RegistrationNumber": "",
		"Name": "FP Nex Hyper",
		"CustomerUid": 6,
		"StreetAddress": "23 SERANGOON CENTRAL #03-42 NEX MALL SINGAPORE",
		"ExpiryDate": null,
		"ClassUid": 4475,
		"TownUid": 45,
		"VisitFrequency": 0,
		"DistrictUid": 29,
		"ProvinceUid": 28,
		"Type": null,
		"Group": null,
		"SubTown": null,
		"Town": "Serangoon Garden",
		"District": "North East",
		"Province": "North Region",
		"Class": "%s%s%08da",
		"Customer": "Fairprice",
		"IsActive": 1
	},
	{
		"Uid": 53,
		"Id": "4",
		"RegistrationNumber": "",
		"Name": "FP Tampines Mall",
		"CustomerUid": 6,
		"StreetAddress": "4 TAMPINES CENTRAL 5 #B1-12 TAMPINES MALL SINGAPORE",
		"ExpiryDate": null,
		"ClassUid": 4476,
		"TownUid": 46,
		"VisitFrequency": 0,
		"DistrictUid": 8,
		"ProvinceUid": 7,
		"Type": null,
		"Group": null,
		"SubTown": null,
		"Town": "Tampines",
		"District": "Far East",
		"Province": "East Region",
		"Class": "Mall",
		"Customer": "Fairprice",
		"IsActive": 1
	},
	{
		"Uid": 54,
		"Id": "6",
		"RegistrationNumber": "",
		"Name": "FP Toa Payoh Hub",
		"CustomerUid": 6,
		"StreetAddress": "500 LORONG 6 TOA PAYOH #B1-32/#01-33 HDB HUB SINGAPORE",
		"ExpiryDate": null,
		"ClassUid": 4476,
		"TownUid": 49,
		"VisitFrequency": 0,
		"DistrictUid": 48,
		"ProvinceUid": 3,
		"Type": null,
		"Group": null,
		"SubTown": null,
		"Town": "Toa Payoh",
		"District": "Central",
		"Province": "Central Region",
		"Class": "Mall",
		"Customer": "Fairprice",
		"IsActive": 1
	},
	{
		"Uid": 55,
		"Id": "9",
		"RegistrationNumber": "",
		"Name": "Giant IMM",
		"CustomerUid": 3,
		"StreetAddress": "2 JURONG EAST STREET 21 #01-100 IMM SINGAPORE",
		"ExpiryDate": null,
		"ClassUid": 4477,
		"TownUid": 43,
		"VisitFrequency": 0,
		"DistrictUid": 42,
		"ProvinceUid": 11,
		"Type": null,
		"Group": null,
		"SubTown": null,
		"Town": "Jurong",
		"District": "Far West",
		"Province": "West Region",
		"Class": "Supermarket",
		"Customer": "Giant",
		"IsActive": 1
	},
	{
		"Uid": 56,
		"Id": "11",
		"RegistrationNumber": null,
		"Name": "Giant Parkway Parade",
		"CustomerUid": 3,
		"StreetAddress": "80 MARINE PARADE RD #03-27/28 SINGAPORE",
		"ExpiryDate": null,
		"ClassUid": 4476,
		"TownUid": 52,
		"VisitFrequency": null,
		"DistrictUid": 10,
		"ProvinceUid": 7,
		"Type": null,
		"Group": null,
		"SubTown": null,
		"Town": "Amber Road",
		"District": "East Coast",
		"Province": "East Region",
		"Class": "Mall",
		"Customer": "Giant",
		"IsActive": 1
	},
	{
		"Uid": 57,
		"Id": "13",
		"RegistrationNumber": null,
		"Name": "Giant Parkway Parade",
		"CustomerUid": 3,
		"StreetAddress": "80 MARINE PARADE RD #03-27/28 SINGAPORE",
		"ExpiryDate": null,
		"ClassUid": 4475,
		"TownUid": 50,
		"VisitFrequency": null,
		"DistrictUid": 9,
		"ProvinceUid": 7,
		"Type": null,
		"Group": null,
		"SubTown": null,
		"Town": "Bedok",
		"District": "Upper East Coast",
		"Province": "East Region",
		"Class": "%s%s%08da",
		"Customer": "Giant",
		"IsActive": 1
	},
	{
		"Uid": 58,
		"Id": "12",
		"RegistrationNumber": null,
		"Name": "Giant Sembawang",
		"CustomerUid": 3,
		"StreetAddress": "604 SEMBAWANG ROAD SEMBAWANG SHOPPING CENTRE #B1-25 SINGAPORE",
		"ExpiryDate": null,
		"ClassUid": 4475,
		"TownUid": 54,
		"VisitFrequency": null,
		"DistrictUid": 53,
		"ProvinceUid": 28,
		"Type": null,
		"Group": null,
		"SubTown": null,
		"Town": "Sembawang",
		"District": "Far North",
		"Province": "North Region",
		"Class": "%s%s%08da",
		"Customer": "Giant",
		"IsActive": 1
	},
	{
		"Uid": 59,
		"Id": "8",
		"RegistrationNumber": "",
		"Name": "Giant Tampines",
		"CustomerUid": 3,
		"StreetAddress": "21 TAMPINES NORTH DRIVE 2 #03-01 SINGAPORE",
		"ExpiryDate": null,
		"ClassUid": 4477,
		"TownUid": 46,
		"VisitFrequency": 0,
		"DistrictUid": 8,
		"ProvinceUid": 7,
		"Type": null,
		"Group": null,
		"SubTown": null,
		"Town": "Tampines",
		"District": "Far East",
		"Province": "East Region",
		"Class": "Supermarket",
		"Customer": "Giant",
		"IsActive": 1
	},
	{
		"Uid": 60,
		"Id": "10",
		"RegistrationNumber": null,
		"Name": "Giant Vivo City",
		"CustomerUid": 3,
		"StreetAddress": "1 HARBOURFRONT WALK #B1-23 / #01-23 VIVOCITY SINGAPORE",
		"ExpiryDate": null,
		"ClassUid": 4475,
		"TownUid": 51,
		"VisitFrequency": null,
		"DistrictUid": 26,
		"ProvinceUid": 25,
		"Type": null,
		"Group": null,
		"SubTown": null,
		"Town": "Harbourfront",
		"District": "South East",
		"Province": "South Region",
		"Class": "%s%s%08da",
		"Customer": "Giant",
		"IsActive": 1
	},
	{
		"Uid": 61,
		"Id": "23",
		"RegistrationNumber": "",
		"Name": "Shell Siglap",
		"CustomerUid": 11,
		"StreetAddress": "40 UPPER EAST COAST RD SINGAPORE",
		"ExpiryDate": null,
		"ClassUid": 4477,
		"TownUid": 50,
		"VisitFrequency": 0,
		"DistrictUid": 9,
		"ProvinceUid": 7,
		"Type": null,
		"Group": null,
		"SubTown": null,
		"Town": "Bedok",
		"District": "Upper East Coast",
		"Province": "East Region",
		"Class": "Supermarket",
		"Customer": "Shell",
		"IsActive": 1
	},
	{
		"Uid": 62,
		"Id": "24",
		"RegistrationNumber": "",
		"Name": "Sheng Siong Bedok 209",
		"CustomerUid": 8,
		"StreetAddress": "209 NEW UPPER CHANGI ROAD #01-631/#02-631 SINGAPORE",
		"ExpiryDate": null,
		"ClassUid": 4477,
		"TownUid": 50,
		"VisitFrequency": 0,
		"DistrictUid": 9,
		"ProvinceUid": 7,
		"Type": null,
		"Group": null,
		"SubTown": null,
		"Town": "Bedok",
		"District": "Upper East Coast",
		"Province": "East Region",
		"Class": "Supermarket",
		"Customer": "Sheng Siong",
		"IsActive": 1
	},
	{
		"Uid": 63,
		"Id": "26",
		"RegistrationNumber": "",
		"Name": "Sheng Siong Clementi 720",
		"CustomerUid": 8,
		"StreetAddress": "BLK 720 CLEMENTI WEST STREET 2 #01-144 SINGAPORE",
		"ExpiryDate": null,
		"ClassUid": 4477,
		"TownUid": 65,
		"VisitFrequency": 0,
		"DistrictUid": 64,
		"ProvinceUid": 11,
		"Type": null,
		"Group": null,
		"SubTown": null,
		"Town": "Clementi",
		"District": "West Coast",
		"Province": "West Region",
		"Class": "Supermarket",
		"Customer": "Sheng Siong",
		"IsActive": 1
	},
	{
		"Uid": 64,
		"Id": "27",
		"RegistrationNumber": "",
		"Name": "Sheng Siong Tanglin Halt",
		"CustomerUid": 8,
		"StreetAddress": "BLK 88 TANGLIN HALT ROAD #01-10 SINGAPORE",
		"ExpiryDate": null,
		"ClassUid": 4475,
		"TownUid": 66,
		"VisitFrequency": 0,
		"DistrictUid": 64,
		"ProvinceUid": 11,
		"Type": null,
		"Group": null,
		"SubTown": null,
		"Town": "Bukit Merah",
		"District": "West Coast",
		"Province": "West Region",
		"Class": "%s%s%08da",
		"Customer": "Sheng Siong",
		"IsActive": 1
	},
	{
		"Uid": 65,
		"Id": "28",
		"RegistrationNumber": "",
		"Name": "Sheng Siong Woodlands 6A",
		"CustomerUid": 8,
		"StreetAddress": "BLK 6A #01-280 6A WOODLANDS CENTRE ROAD SINAPORE",
		"ExpiryDate": null,
		"ClassUid": 4477,
		"TownUid": 67,
		"VisitFrequency": 0,
		"DistrictUid": 53,
		"ProvinceUid": 28,
		"Type": null,
		"Group": null,
		"SubTown": null,
		"Town": "Woodlands",
		"District": "Far North",
		"Province": "North Region",
		"Class": "Supermarket",
		"Customer": "Sheng Siong",
		"IsActive": 1
	},
	{
		"Uid": 66,
		"Id": "29",
		"RegistrationNumber": "",
		"Name": "Sheng Siong Woodlands E7",
		"CustomerUid": 8,
		"StreetAddress": "200 WOODLANDS INDUSTRIAL PARK E7 SINGAPORE",
		"ExpiryDate": null,
		"ClassUid": 4475,
		"TownUid": 67,
		"VisitFrequency": 0,
		"DistrictUid": 53,
		"ProvinceUid": 28,
		"Type": null,
		"Group": null,
		"SubTown": null,
		"Town": "Woodlands",
		"District": "Far North",
		"Province": "North Region",
		"Class": "%s%s%08da",
		"Customer": "Sheng Siong",
		"IsActive": 1
	},
	{
		"Uid": 67,
		"Id": "30",
		"RegistrationNumber": "",
		"Name": "Sheng Siong Yishun 845",
		"CustomerUid": 8,
		"StreetAddress": "BLK 845 YISHUN ST 81 #01-186 SINGAPORE",
		"ExpiryDate": null,
		"ClassUid": 4477,
		"TownUid": 56,
		"VisitFrequency": 0,
		"DistrictUid": 55,
		"ProvinceUid": 28,
		"Type": null,
		"Group": null,
		"SubTown": null,
		"Town": "Yishun",
		"District": "North West",
		"Province": "North Region",
		"Class": "Supermarket",
		"Customer": "Sheng Siong",
		"IsActive": 1
	},
	{
		"Uid": 68,
		"Id": "31",
		"RegistrationNumber": "",
		"Name": "SPC - 157 UPPER EAST COAST",
		"CustomerUid": 10,
		"StreetAddress": "157 UPPER EAST COAST ROAD SINGAPORE",
		"ExpiryDate": null,
		"ClassUid": 4477,
		"TownUid": 50,
		"VisitFrequency": 0,
		"DistrictUid": 9,
		"ProvinceUid": 7,
		"Type": null,
		"Group": null,
		"SubTown": null,
		"Town": "Bedok",
		"District": "Upper East Coast",
		"Province": "East Region",
		"Class": "Supermarket",
		"Customer": "SPC",
		"IsActive": 1
	},
	{
		"Uid": 69,
		"Id": "32",
		"RegistrationNumber": "",
		"Name": "SPC - 11 PASIR RIS ROAD",
		"CustomerUid": 10,
		"StreetAddress": "11 PASIR RIS ROAD SINGAPORE",
		"ExpiryDate": null,
		"ClassUid": 4475,
		"TownUid": 68,
		"VisitFrequency": 0,
		"DistrictUid": 8,
		"ProvinceUid": 7,
		"Type": null,
		"Group": null,
		"SubTown": null,
		"Town": "Changi",
		"District": "Far East",
		"Province": "East Region",
		"Class": "%s%s%08da",
		"Customer": "SPC",
		"IsActive": 1
	},
	{
		"Uid": 70,
		"Id": "33",
		"RegistrationNumber": "",
		"Name": "Yes Supermarket",
		"CustomerUid": 12,
		"StreetAddress": "201B TAMPINES STREET 21 SINGAPORE",
		"ExpiryDate": null,
		"ClassUid": 4477,
		"TownUid": 46,
		"VisitFrequency": 0,
		"DistrictUid": 8,
		"ProvinceUid": 7,
		"Type": null,
		"Group": null,
		"SubTown": null,
		"Town": "Tampines",
		"District": "Far East",
		"Province": "East Region",
		"Class": "Supermarket",
		"Customer": "Yes Supermarket",
		"IsActive": 1
	},
	{
		"Uid": 1003,
		"Id": "0001003",
		"RegistrationNumber": "",
		"Name": "Walukarama Colombo 03",
		"CustomerUid": 3,
		"StreetAddress": "NO.67, WALUKARAMA ROAD, COLOMBO 03, SRI LANKA",
		"ExpiryDate": null,
		"ClassUid": 4477,
		"TownUid": 71,
		"VisitFrequency": 0,
		"DistrictUid": 70,
		"ProvinceUid": 69,
		"Type": null,
		"Group": null,
		"SubTown": null,
		"Town": "Colombo 03",
		"District": "Colombo",
		"Province": "Western",
		"Class": "Supermarket",
		"Customer": "Giant",
		"IsActive": 1
	},
	{
		"Uid": 1004,
		"Id": "0001004",
		"RegistrationNumber": "",
		"Name": "Walukarama FG",
		"CustomerUid": 3,
		"StreetAddress": "NO.67, WALUKARAMA ROAD, COLOMBO 03, SRI LANKA",
		"ExpiryDate": null,
		"ClassUid": 4475,
		"TownUid": 71,
		"VisitFrequency": 0,
		"DistrictUid": 70,
		"ProvinceUid": 69,
		"Type": null,
		"Group": null,
		"SubTown": null,
		"Town": "Colombo 03",
		"District": "Colombo",
		"Province": "Western",
		"Class": "%s%s%08da",
		"Customer": "Giant",
		"IsActive": 1
	},
	{
		"Uid": 1007,
		"Id": "35",
		"RegistrationNumber": "",
		"Name": "Cold Storage Tampines One",
		"CustomerUid": 7,
		"StreetAddress": "10 TAMPINES CENTRAL 1 #B1-01/02 TAMPINES 1. SINGAPORE",
		"ExpiryDate": null,
		"ClassUid": 4477,
		"TownUid": 46,
		"VisitFrequency": 0,
		"DistrictUid": 8,
		"ProvinceUid": 7,
		"Type": null,
		"Group": null,
		"SubTown": null,
		"Town": "Tampines",
		"District": "Far East",
		"Province": "East Region",
		"Class": "Supermarket",
		"Customer": "Cold Storage",
		"IsActive": 1
	},
	{
		"Uid": 1008,
		"Id": "36",
		"RegistrationNumber": "",
		"Name": "FP East Point",
		"CustomerUid": 6,
		"StreetAddress": "3 SIMEI STREET 6, #05-01 EASTPOINT MALL",
		"ExpiryDate": null,
		"ClassUid": 4477,
		"TownUid": 46,
		"VisitFrequency": 0,
		"DistrictUid": 8,
		"ProvinceUid": 7,
		"Type": null,
		"Group": null,
		"SubTown": null,
		"Town": "Tampines",
		"District": "Far East",
		"Province": "East Region",
		"Class": "Supermarket",
		"Customer": "Fairprice",
		"IsActive": 1
	},
	{
		"Uid": 1014,
		"Id": "123",
		"RegistrationNumber": "123",
		"Name": "Yusufs",
		"CustomerUid": 3,
		"StreetAddress": "67 WALUKARAMA ROAD",
		"ExpiryDate": null,
		"ClassUid": 0,
		"TownUid": 71,
		"VisitFrequency": 0,
		"DistrictUid": 70,
		"ProvinceUid": 69,
		"Type": null,
		"Group": null,
		"SubTown": null,
		"Town": "Colombo 03",
		"District": "Colombo",
		"Province": "Western",
		"Class": "KitKat new ",
		"Customer": "Giant",
		"IsActive": 1
	},
	{
		"Uid": 1016,
		"Id": "outle",
		"RegistrationNumber": "jhdsfd ad",
		"Name": "outlet et",
		"CustomerUid": 3,
		"StreetAddress": "DSHFJDGFHH EL",
		"ExpiryDate": null,
		"ClassUid": 4477,
		"TownUid": 71,
		"VisitFrequency": 1,
		"DistrictUid": 70,
		"ProvinceUid": 69,
		"Type": null,
		"Group": null,
		"SubTown": null,
		"Town": "Colombo 03",
		"District": "Colombo",
		"Province": "Western",
		"Class": "Supermarket",
		"Customer": "Giant",
		"IsActive": 1
	},
	{
		"Uid": 1018,
		"Id": "outlet id 1322414",
		"RegistrationNumber": "jhdsfd ad",
		"Name": "outlet et",
		"CustomerUid": 3,
		"StreetAddress": "DSHFJDGFHH EL",
		"ExpiryDate": null,
		"ClassUid": 4477,
		"TownUid": 71,
		"VisitFrequency": 1,
		"DistrictUid": 70,
		"ProvinceUid": 69,
		"Type": null,
		"Group": null,
		"SubTown": null,
		"Town": "Colombo 03",
		"District": "Colombo",
		"Province": "Western",
		"Class": "Supermarket",
		"Customer": "Giant",
		"IsActive": 1
	},
	{
		"Uid": 1019,
		"Id": "HD",
		"RegistrationNumber": "871123",
		"Name": "HD Thenuwara",
		"CustomerUid": 18,
		"StreetAddress": "11TH, MILE POST, ELPITIYA",
		"ExpiryDate": null,
		"ClassUid": 4477,
		"TownUid": 93,
		"VisitFrequency": 0,
		"DistrictUid": 92,
		"ProvinceUid": 91,
		"Type": null,
		"Group": null,
		"SubTown": null,
		"Town": "Veilannagar",
		"District": "Thamil Nadu",
		"Province": "South India",
		"Class": "Supermarket",
		"Customer": "Jay Alfalfa",
		"IsActive": 1
	},
	{
		"Uid": 1020,
		"Id": "444",
		"RegistrationNumber": "123",
		"Name": "Kris",
		"CustomerUid": 3,
		"StreetAddress": "123",
		"ExpiryDate": null,
		"ClassUid": 4476,
		"TownUid": 52,
		"VisitFrequency": 0,
		"DistrictUid": 10,
		"ProvinceUid": 7,
		"Type": null,
		"Group": null,
		"SubTown": null,
		"Town": "Amber Road",
		"District": "East Coast",
		"Province": "East Region",
		"Class": "Mall",
		"Customer": "Giant",
		"IsActive": 1
	},
	{
		"Uid": 1023,
		"Id": "80045",
		"RegistrationNumber": "4569",
		"Name": "Outlet Yusuf",
		"CustomerUid": 3,
		"StreetAddress": "142/23 JENSON WATTA, ANDERSON ROAD",
		"ExpiryDate": null,
		"ClassUid": 4583,
		"TownUid": 68,
		"VisitFrequency": 2,
		"DistrictUid": 8,
		"ProvinceUid": 7,
		"Type": null,
		"Group": null,
		"SubTown": null,
		"Town": "Changi",
		"District": "Far East",
		"Province": "East Region",
		"Class": "Outlet 4",
		"Customer": "Giant",
		"IsActive": 1
	},
	{
		"Uid": 1024,
		"Id": "tan_01",
		"RegistrationNumber": "73344841",
		"Name": "Tan Outlet",
		"CustomerUid": 18,
		"StreetAddress": "KARANAGAR.TAN OUTLET",
		"ExpiryDate": null,
		"ClassUid": 4477,
		"TownUid": 68,
		"VisitFrequency": 0,
		"DistrictUid": 8,
		"ProvinceUid": 7,
		"Type": null,
		"Group": null,
		"SubTown": null,
		"Town": "Changi",
		"District": "Far East",
		"Province": "East Region",
		"Class": "Supermarket",
		"Customer": "Jay Alfalfa",
		"IsActive": 1
	},
	{
		"Uid": 1025,
		"Id": "id 1",
		"RegistrationNumber": "134110",
		"Name": "outlet 1",
		"CustomerUid": 19,
		"StreetAddress": "STREET 1",
		"ExpiryDate": null,
		"ClassUid": 4477,
		"TownUid": 63,
		"VisitFrequency": 1,
		"DistrictUid": 57,
		"ProvinceUid": 11,
		"Type": null,
		"Group": null,
		"SubTown": null,
		"Town": "Rochor",
		"District": "South West",
		"Province": "West Region",
		"Class": "Supermarket",
		"Customer": "Darth Raven",
		"IsActive": 1
	},
	{
		"Uid": 1026,
		"Id": "0001026",
		"RegistrationNumber": "",
		"Name": "DAD",
		"CustomerUid": 5,
		"StreetAddress": "DASD",
		"ExpiryDate": null,
		"ClassUid": null,
		"TownUid": 49,
		"VisitFrequency": 0,
		"DistrictUid": 48,
		"ProvinceUid": 3,
		"Type": null,
		"Group": null,
		"SubTown": null,
		"Town": "Toa Payoh",
		"District": "Central",
		"Province": "Central Region",
		"Class": null,
		"Customer": "7Eleven",
		"IsActive": 1
	},
	{
		"Uid": 1026,
		"Id": "0001026",
		"RegistrationNumber": "",
		"Name": "DAD",
		"CustomerUid": 5,
		"StreetAddress": "DASD",
		"ExpiryDate": null,
		"ClassUid": null,
		"TownUid": 49,
		"VisitFrequency": 0,
		"DistrictUid": 48,
		"ProvinceUid": 3,
		"Type": null,
		"Group": null,
		"SubTown": null,
		"Town": "Toa Payoh",
		"District": "Central",
		"Province": "Central Region",
		"Class": null,
		"Customer": "7Eleven",
		"IsActive": 1
	}
];
