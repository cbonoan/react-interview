import { Avatar, Container } from '@mui/material';
import { render } from 'react-dom';
import Table, { ColConfig } from '../components/Table';
import students from '../mock/defaultValues';
import { formatPhone } from '../utils/strings';

const tableConfig: ColConfig[] = [
  {
    key: 'id',
    label: '',
    render: (id) => <Avatar id={id} />
  },
  {
    key: 'fullName',
    label: 'Student Name'
  },
  {
    key: 'totalHours',
    label: 'Total Hours'
  },
  {
    key: 'buttons',
    label: 'Edit/View'
  }
];

const Dashboard = () => {
  return (
    <Container sx={{
      display: 'grid',
      placeItems: 'center',
      width: '100vw',
      height: '100vh',
    }}>
      <Table
        rowKey="id"
        config={tableConfig}
        data={students}
      />
    </Container>
  )
};

export default Dashboard;
