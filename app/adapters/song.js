import ApplicationAdapter from './application';

export default ApplicationAdapter.extend({
  sortQueryParams(query) { 
    let newQueryParams = {};
    let { bandId, pageNumber, sortBy, searchTerm } = query;
    newQueryParams['filter[band_id]'] = bandId;
    newQueryParams['page[number]'] = pageNumber;
    newQueryParams.sort = sortBy;
    if (searchTerm) {
      newQueryParams['filter[title]'] = searchTerm;
    }
    return newQueryParams;
  }
});
