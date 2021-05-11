const Pagination = ({ items, pageSize, onPageChange }) => {
    // Implement the Pagination component
    const { Button } = ReactBootstrap;
    if (items.length <= 1) return null;
    let num = Math.ceil(items.length / pageSize);
    let pages = range(1, num);
    const list = pages.map(page => {
        return (
            <Button key={page} onClick={onPageChange} className="page-item">
                {page}
            </Button>
        );
    });
    return (
        <nav>
            <ul className="pagination">{list}</ul>
        </nav>
    );
};

const range = (start, end) => {
    return Array(end - start + 1)
        .fill(0)
        .map((item, i) => start + i);
};

function paginate(items, pageNumber, pageSize) {
    const start = (pageNumber - 1) * pageSize;
    let page = items.slice(start, start + pageSize);
    return page;
}

const useDataApi = (initialUrl, initialData) => {
    const { useState, useEffect, useReducer } = React;
    const [url, setUrl] = useState(initialUrl);

    const [state, dispatch] = useReducer(dataFetchReducer, {
        isLoading: false,
        isError: false,
        data: initialData,
    });

    useEffect(() => {
        let didCancel = false;
        const fetchData = async () => {
            // Get data from a remote source
            dispatch({ type: "FETCH_INIT" });
            try {
                const result = await axios(url);
                if (!didCancel) {
                    dispatch({ type: "FETCH_SUCCESS", payload: result.data });
                }
            } catch (error) {
                if (!didCancel) {
                    dispatch({ type: "FETCH_FAILURE" });
                }
            };
        };
        fetchData();
        return () => {
            didCancel = true;
        };
    }, [url]);
    return [state, setUrl];
};

const dataFetchReducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_INIT':
            return {
                ...state,
                isLoading: true,
                isError: false,
            };
        case 'FETCH_SUCCESS':
            return {
                ...state,
                isLoading: false,
                isError: false,
                data: action.payload,
            };
        case 'FETCH_FAILURE':
            return {
                ...state,
                isLoading: false,
                isError: true,
            };
        default:
            throw new Error();
    }
};

// App that gets data from Hacker News url
function App() {
    const { Fragment, useState, useEffect, useReducer } = React;
    const [query, setQuery] = useState('MIT');
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10;
    const [{ data, isLoading, isError }, doFetch] = useDataApi(
        'https://hn.algolia.com/api/v1/search?query=MIT',
        {
            hits: [],
        }
    );
    const handlePageChange = (e) => {
        setCurrentPage(Number(e.target.textContent));
    };
    let page = data.hits;
    if (page.length >= 1) {
        page = paginate(page, currentPage, pageSize);
        console.log(`currentPage: ${currentPage}`);
    }
    return (
        <Fragment>
            {isLoading ? (
                <div>Loading ...</div>
            ) : (
                // Style the list using Bootstrap
                <ul className="list-group">
                    {page.map((item) => (
                        <li key={item.objectID} className="list-group-item">
                            <a href={item.url}>{item.title}</a>
                        </li>
                    ))}
                </ul>
            )}
            <Pagination
                items={data.hits}
                pageSize={pageSize}
                onPageChange={handlePageChange}
            ></Pagination>
        </Fragment>
    );
}

// ========================================
ReactDOM.render(<App />, document.getElementById('root'));