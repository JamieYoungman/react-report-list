import React from 'react';
import styled from 'styled-components';

import Report from './Report';

const Title = styled.h1`
	text-align: center;
`;
Title.displayName = 'Title';

const TableHeader = styled.div`
	margin-top: 24px;
	width: 100%;
	display: flex;
	flex-flow: row;
	justify-content: space-between;
	border-left: 1px solid #ccc;
`;
TableHeader.displayName = 'TableHeader';

const TableHeading = styled.div`
	font-weight: bold;
	font-size: 18px;
	text-align: center;
	padding: 8px;
	border-top: 1px solid #ccc;
	border-right: 1px solid #ccc;
	width: 15%;
	${props => {
		switch (props.index) {
			case 4:
				return 'width: 10%;';
			default:
				return 'width: 15%';
		}
	}}

	&:first-child {
		width: 35%;
		text-align: left;
	}
	&:last-child {
		width: 10%;
	}
`;
TableHeading.displayName = 'TableHeading';

const Grid = styled.div`
	width: 100%;
	border-left: 1px solid #ccc;
	border-bottom: 1px solid #ccc;
`;
Grid.displayName = 'Grid';

const Sort = styled.div`
	width: auto;
	float: left;
	margin-bottom: 24px;
`;
Sort.displayName = 'Sort';

const SortLabel = styled.label`
	float: left;
	margin-right: 12px;
`;
SortLabel.displayName = 'SortLabel';

const Filter = styled.div`
	width: auto;
	float: left;
	margin-left: 12px;
`;
Filter.displayName = 'Filter';

const FilterLabel = styled.label`
	float: left;
	margin-right: 12px;
`;
FilterLabel.displayName = 'FilterLabel';

class ReportList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			reports: props.data,
			filter: undefined,
			sort: undefined
		};
		this.handleSortBy = this.handleSortBy.bind(this);
		this.handleFilterType = this.handleFilterType.bind(this);
		this.handleDeleteReport = this.handleDeleteReport.bind(this);
	}

	handleSortBy(event) {
		this.setState({
			sort: event.target.value
		});
	}

	handleFilterType(event) {
		if (event.target.value !== 'Select') {
			this.setState({
				filter: event.target.value
			});
		}
	}

	handleDeleteReport(deleteIndex) {
		this.setState({
			reports: this.state.reports.filter(
				(item, index) => deleteIndex !== index
			)
		});
	}
	render() {
		const { reports, sort, filter } = this.state;

		const tableHeadings = [
			'Name',
			'Type',
			'Frequency',
			'Chart Type',
			'Active',
			'Delete'
		];

		return (
			<React.Fragment>
				<Title>Report List</Title>
				<Sort>
					<SortLabel>Sort by Report Name:</SortLabel>
					<select onChange={this.handleSortBy}>
						<option value="Select">Select</option>
						<option value="A-Z">A-Z</option>
						<option value="Z-A">Z-A</option>
					</select>
				</Sort>

				<Filter>
					<FilterLabel>Filter by type</FilterLabel>
					<select onChange={this.handleFilterType}>
						<option value="Select">Select</option>
						<option value="Visitors">Visitors</option>
						<option value="Gender">Gender</option>
						<option value="Age range">Age Range</option>
					</select>
				</Filter>

				<TableHeader>
					{tableHeadings.map((heading, index) => {
						return (
							<TableHeading index={index} key={heading}>
								{heading}
							</TableHeading>
						);
					})}
				</TableHeader>
				<Grid>
					{reports
						.sort((a, b) => {
							if (sort !== undefined) {
								return sort === 'A-Z'
									? a.name.localeCompare(b.name)
									: b.name.localeCompare(a.name);
							}
							return reports;
						})
						.filter(
							item => filter === undefined || item.type === filter
						)
						.map((report, index) => (
							<Report
								key={report.name}
								name={report.name}
								type={report.type}
								frequency={report.frequency}
								active={report.active}
								chartType={report.chartType}
								deleteReport={() =>
									this.handleDeleteReport(index)
								}
							/>
						))}
				</Grid>
			</React.Fragment>
		);
	}
}

export default ReportList;
