import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import s from './ContainerTabs.module.css';
import Summary from '../Summary/Summary';
import CalendarComponent from '../CalendarBar/CalendarBar';
import Table from '../Table';

const ContainerTabs = () => {
return (
  <Tabs className={s.tabsContainer}>
    <TabList className={s.tabList}>
      <Tab className={s.tab} selectedClassName={s.selectedTab}>Расход</Tab>
      <Tab className={s.tab} selectedClassName={s.selectedTab}>Доход</Tab>
    </TabList>

    <TabPanel>
      <div className={s.tabPanel}>
        <CalendarComponent />
        <Table />
        <Summary />
      </div>
    </TabPanel>
    <TabPanel>
      <div className={s.tabPanel}>
        
      </div>
    </TabPanel>
  </Tabs>
)};

export default ContainerTabs;