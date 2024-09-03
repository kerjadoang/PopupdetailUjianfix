import React, {useEffect} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import LainnyaTab from './LainnyaTab';
import MateriTab from './MateriTab';
import SemuaTab from './SemuaTab';
import VideoTab from './VideoTab';
import SoalTab from './SoalTab';
import Colors from '@constants/colors';
import {useDispatch} from 'react-redux';
import {fetchSpecificSearch, fetchSpecificSearchAll} from '@redux';
import TabBarLabel from '@components/atoms/TabBarLabel';
import {ParamList} from 'type/screen';

const Tab = createMaterialTopTabNavigator<ParamList>();

const GlobalSearchTabScreens = (props: any) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      fetchSpecificSearch({
        words: props.query,
        page: 1,
        size: 10,
        global_type: 'soal',
      }),
    );

    dispatch(
      fetchSpecificSearch({
        words: props.query,
        page: 1,
        size: 10,
        global_type: 'video',
      }),
    );

    dispatch(
      fetchSpecificSearch({
        words: props.query,
        page: 1,
        size: 10,
        global_type: 'lainnya',
      }),
    );

    dispatch(
      fetchSpecificSearch({
        words: props.query,
        page: 1,
        size: 10,
        global_type: 'materi',
      }),
    );

    dispatch(fetchSpecificSearchAll({words: props.query}));
  }, [dispatch, props.query]);

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarScrollEnabled: true,
        tabBarItemStyle: {
          width: 86,
        },
        tabBarStyle: {
          height: 45,
          elevation: 0,
          borderBottomWidth: 1,
          borderBottomColor: Colors.dark.neutral20,
        },
        tabBarIndicatorStyle: {
          borderTopLeftRadius: 5,
          borderTopRightRadius: 5,
          height: 4,
          backgroundColor: Colors.primary.base,
        },
      }}>
      <Tab.Screen
        name="SemuaTabScreen"
        component={SemuaTab}
        initialParams={props}
        options={{
          tabBarLabel: props => <TabBarLabel {...props} title="Semua" />,
        }}
      />
      <Tab.Screen
        name="MateriTabScreen"
        component={MateriTab}
        initialParams={props}
        options={{
          tabBarLabel: props => <TabBarLabel {...props} title="Materi" />,
        }}
      />
      <Tab.Screen
        name="VideoTabScreen"
        component={VideoTab}
        initialParams={props}
        options={{
          tabBarLabel: props => <TabBarLabel {...props} title="Video" />,
        }}
      />
      <Tab.Screen
        name="SoalTabScreen"
        component={SoalTab}
        initialParams={props}
        options={{
          tabBarLabel: props => <TabBarLabel {...props} title="Soal" />,
        }}
      />
      <Tab.Screen
        name="LainnyaTabScreen"
        component={LainnyaTab}
        initialParams={props}
        options={{
          tabBarLabel: props => <TabBarLabel {...props} title="Lainnya" />,
        }}
      />
    </Tab.Navigator>
  );
};

export default GlobalSearchTabScreens;
