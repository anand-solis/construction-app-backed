const pagination = async (page,limit,count)=>{
    page = page?+page:1
    limit = limit?+limit:10
    let skip = (page-1)*limit
    return {skip,perPage:limit}

}

module.exports = pagination