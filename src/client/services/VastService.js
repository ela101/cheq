import xhrReq from '../utils/xhr';

const fetchVasts = () => xhrReq({
  path: '/fetch_vasts',
});
const addVast = data => xhrReq({
  path: '/create_vast',
  method: 'POST',
  body: data,
});
const updateVast = data => xhrReq({
  path: '/edit_vast',
  method: 'POST',
  body: data,
});

const getVastById = id => xhrReq({
  path: `/?id=${id}`,
});

const VastService = {
  fetchVasts,
  addVast,
  updateVast,
  getVastById,
};

export default VastService;
