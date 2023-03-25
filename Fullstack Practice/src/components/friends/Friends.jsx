import React, { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import friendsService from "../services/friendsService";
import ASingleFriend from "./ASingleFriend";
import Pagination from "rc-pagination";
import 'rc-pagination/assets/index.css';
import locale from "rc-pagination/lib/locale/en_US";
import debug from "sabio-debug"

function Friends() {
    const navigate = useNavigate();
    const [friend, setFriend] = useState({
        arrayOfFriends: [],
        friendComponents: [],
        pageIndex: 0,
        pageSize: 8,
        totalCount: 10
    });
    const [showFriends, setShowFriends] = useState(false);

    const [searchFriend, setSearchFriend] = useState({
        query: "",

    });

    const _logger = debug.extend("Friends")

    const onFormFieldChanged = event => {
        const target = event.target;

        const newUserValue = target.value;

        const nameOfField = target.name

        setSearchFriend((prevstate) => {
            const updatedFormData = { ...prevstate };
            updatedFormData[nameOfField] = newUserValue

            return updatedFormData

        });
    };


    useEffect(() => {
        console.log("this is paginatedData", friend.pageIndex);
        friendsService
            .getAllFriends(friend.pageIndex, friend.pageSize)
            .then(getAllFriendsSuccess)
            .catch(getAllFriendsError)
    }, [friend.pageIndex]
    )

    const onShowFriendsClicked = (e) => {
        e.preventDefault();
        setShowFriends(!showFriends)

    }

    const onDeleteClicked = useCallback((myFriend, eObj) => {
        console.log(myFriend.id, { myFriend, eObj });
        const idToBeDeleted = myFriend.id;

        const handler = getDeleteSuccessHandler(idToBeDeleted);

        friendsService
            .deleteFriendById(idToBeDeleted)
            .then(handler)
            .catch(onDeleteFriendError)


    }, []);


    const onEditClicked = useCallback((myFriend, eObj) => {
        console.log(myFriend.id, { myFriend, eObj });
        const friendTransport = { type: "MY_FRIEND", payload: myFriend }
        navigate(`/friends/${myFriend.id}`, { state: friendTransport })
    }, []);

    const getDeleteSuccessHandler = (idToBeDeleted) => {
        console.log("getDeleteSuccessHandler", idToBeDeleted);
        return () => {
            console.log("OnDeleteFriendSuccess", idToBeDeleted);

            setFriend(prevState => {
                const friendData = { ...prevState };
                friendData.arrayOfFriends = [...friendData.arrayOfFriends];

                const idxOf = friendData.arrayOfFriends.findIndex((friend) => {

                    let result = false;

                    if (friend.id === idToBeDeleted) {
                        result = true;
                    }

                    return result;
                });

                if (idxOf >= 0) {
                    friendData.arrayOfFriends.splice(idxOf, 1)
                    friendData.friendComponents = friendData.arrayOfFriends.map(mapFriends);
                }

                return friendData;
            });
        }
    }

    const onFriendSearch = (e) => {
        e.preventDefault();
        var pageIndex = 0;
        var pageSize = 10;

        friendsService
            .searchFrd(pageIndex, pageSize, searchFriend.query)
            .then(searchFrdSuccess)
            .catch(searchFrdError)
    }

    const getAllFriendsSuccess = (data) => {
        //console.log("getAllFriendsSuccess", data);
        _logger("getAllFriendsSuccess")
        setFriend((prevState) => {
            const newFriends = { ...prevState };
            newFriends.arrayOfFriends = data.item.pagedItems;
            newFriends.pageIndex = data.item.pageIndex;
            newFriends.pageSize = data.item.pageSize;
            newFriends.totalCount = data.item.totalCount;

            return newFriends
        })

    }

    const getAllFriendsError = (err) => {
        console.log("getAllFriendsError", err);
    }

    const onDeleteFriendError = (err) => {
        console.log("Deleting", err);
    }

    const searchFrdSuccess = (response) => {
        console.log("searchFrdSuccess", response);

        setFriend((prevState) => {
            const newFriends = { ...prevState };
            newFriends.arrayOfFriends = response.data.item.pagedItems;

            return newFriends
        })
    }

    const searchFrdError = (err) => {
        console.log("searchFrdError", err);
    }

    const mapFriends = aFriendData => {
        return <ASingleFriend key={"myFriends" + aFriendData.id} aFriendProp={aFriendData}
            onEditFriend={onEditClicked} onFriendClicked={onDeleteClicked} />
    }

    const onPageChange = (e) => {
        console.log("pagechange", e);
        const pageClicked = e
        setFriend((prevstate) => {
            const pd = { ...prevstate }
            pd.pageIndex = pageClicked - 1
            return pd
        })
    }

    return (
        <React.Fragment>

            <div className="container characters">
                <form className="form-inline m-2">
                    <input className="form-control d-flex m-2" type="search" value={searchFriend.query} onChange={onFormFieldChanged} name={"query"}
                        placeholder="Search" aria-label="Search" />
                    <button className="btn btn-success m-2" onClick={onFriendSearch} type="submit">Search</button>
                    <button className="btn btn-secondary m-2 col-3" type="button" id="showFriends" onClick={onShowFriendsClicked}>Show friends</button>
                    <Link className="btn btn-success col-3 m-2" to={"new"} href="#" role="button">Add Friends</Link>
                </form>
                <div className="row justify-content-center d-flex">


                    <div className="container">
                        <div className="row justify-content-center d-flex">
                            <Pagination
                                className="d-flex justify-content-center rc-pagination"
                                total={friend.totalCount}
                                pageSize={friend.pageSize}
                                onChange={onPageChange}
                                currentPage={friend.pageIndex + 1}
                                locale={locale} />
                            {showFriends && friend.arrayOfFriends.map(mapFriends)}
                        </div>
                        <Pagination
                            className="d-flex justify-content-center rc-pagination"
                            total={friend.totalCount}
                            pageSize={friend.pageSize}
                            onChange={onPageChange}
                            currentPage={friend.pageIndex + 1}
                            locale={locale} />
                    </div>
                </div>
            </div>

        </React.Fragment>
    );
}

export default Friends;


// const handleFiltering = () => {
//     const filterList = people.list.filter(filterPerson);
//     setPeople((prevState) => {
//       let filterState = { ...prevState };
//       filterState.filterList = filterList;
//       return filterState;
//     });
//   };
//   const filterPerson = (person =>(person.LastName === "Ten"))
//   console.log(filterPerson,"filter")
//   useEffect(() => {
//     handleFiltering(handleMapping())
//    }, []);