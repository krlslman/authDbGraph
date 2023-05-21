import React, { useState } from 'react'
import { Dropdown, Button, Menu } from "antd"
import { FilterOutlined } from "@ant-design/icons"
import { useStateContext } from '/src/context/StateContext'

const FilterButton = () => {
    const { 
        dataSource,
        setDataSource,
        filteredDataSource,
        setFilteredDataSource,
        filterWarehouse,
        setFilterWarehouse,
        setRadioFilter,
        } = useStateContext();

  const handleFilterWarehouse = (filter) => {
        setFilterWarehouse(filter);
        const i = filteredDataSource.filter((item) => item.warehouse.includes(filter));
        setFilteredDataSource(i);
    }
    const handleClearFilter = () => {
        setFilteredDataSource(dataSource);
        setRadioFilter("All")
    }

    const menuFilterWarehouse = (
        <Menu>
          {[
            "McKesson",
            "Washington",
            "Cardinal",
            "Unifirst"
          ].map((filter) => (
            <Menu.Item key={filter} onClick={() => handleFilterWarehouse(filter)}>
              {filter}
            </Menu.Item>
          ))}
        </Menu>
      );

  return (
    <>
    <Dropdown overlay={menuFilterWarehouse} trigger={["click"]}>
        <Button className='btn-primary'>
        Warehouse Filter <FilterOutlined />
        </Button>
    </Dropdown>

    <button
        onClick={() => handleClearFilter() }
        className="p-2 text-red-600 underline text-xs"
    >
        Clear All Filters
    </button>
    </>
  )
}

export default FilterButton