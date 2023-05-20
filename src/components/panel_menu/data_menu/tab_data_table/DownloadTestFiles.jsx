import { Modal, Button } from 'antd';

const DownloadTestDataModal = ({ visible, onClose }) => {
  const handleDownload = (fileFormat) => {
    const downloadLink = document.createElement('a');
    downloadLink.href = `/src/data/testdata.${fileFormat}`;
    downloadLink.download = `testdata.${fileFormat}`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <Modal
      title="Download Test Data"
      open={visible}
      onCancel={onClose}
      footer={null}
      style={{maxWidth:"fit-content"}}
    >
      <div className="flex flex-col gap-2">
        <div className=''>
            <Button onClick={() => handleDownload('xlsx')} type="primary" className='text-blue-500' >
            Download as XLSX
            </Button>
        </div>
        <div>
            <Button onClick={() => handleDownload('csv')} type="primary" className='text-blue-500' >
            Download as CSV
            </Button>
        </div>
        <div>
            <Button onClick={() => handleDownload('json')} type="primary" className='text-blue-500' >
            Download as JSON
            </Button>
        </div>
      </div>
    </Modal>
  );
};

export default DownloadTestDataModal;