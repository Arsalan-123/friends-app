import React from 'react'
import { Input, Space } from 'antd';
import { AudioOutlined } from '@ant-design/icons';

const Searchbtn = () => {



    
    const suffix = (
      <AudioOutlined
        style={{
          fontSize: 16,
          color: '#1890ff',
        }}
      />
    );
    const { Search } = Input;

    
    const onSearch = value => console.log(value);
    


    return (
        <div >
            



            <Space  direction="vertical">
    <Search className = "searchBtn" placeholder="input search text"  onSearch={onSearch} style={{ width: 200 }} />
 
  </Space>



        </div>
    )
}

export default Searchbtn;



 