import '../App.css';
import { React, useState, useEffect, useRef } from "react";
import Wheel from "../components/Wheel";
import ItemForm from "../components/ItemForm";
import Result from "../components/Wheel/Result";
import NavigationBar from "../components/NavigationBar";
import { Button, Modal, Container, Row, Col, Tabs, Tab, Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { deleteAllUsers, getUsers,addSub,deleteSub,notify_winner,notify_looser,submit_name,getSub} from '../api/api';
import { useLocation } from 'react-router-dom';
import ModalWin from "../components/ModalWin";

//import MusicPlayer from "./components/MusicPlayer/MusicPlayer";

function Home() {

    //for the live
    const location = useLocation();

    const [spinning, setSpinning] = useState(false);
    const [winners, setWinners] = useState([]);
    const [winner, setWinner] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [users, setUsers] = useState([]);
    const [close,setClose] = useState(false);

  

    //for the extra tab:
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const [imageUr, setImageUr] = useState(null);
    const [emailContent, setEmailContent]= useState('')
    const [emailContentSaye,setEmailContentSaye]=useState(false)
    const [paid, setPaid] = useState(false);
    const [price, setPrice] = useState('');


    const whileref = useRef();
    const [automaticSpin, setAutomaticSpin] = useState(localStorage.getItem("automaticSpin") === "true" ? true : false); // New state for automatic spinning
    // player for youtube url
    const [player, setPlayer] = useState();
    const [urlInput, setUrlInput] = useState();
    /*he code checks if certain values are present in the local storage and sets default values
      if they are not present. */
    if (window.localStorage.getItem("duration") === null)
        localStorage.setItem("duration", 10);

    if (window.localStorage.getItem("wheelColor") === null)
        localStorage.setItem("wheelColor", "#d38c12");

    if (window.localStorage.getItem("fontColor") === null)
        localStorage.setItem("fontColor", "#FFFFFF");

    if (window.localStorage.getItem("fontSize") === null)
        localStorage.setItem("fontSize", "20px");


    const [duration, setDuration] = useState(
        window.localStorage.getItem("duration")
    );

    const [wheelColor, setWheelColor] = useState(
        window.localStorage.getItem("wheelColor")
    );

    const [fontColor, setFontColor] = useState(
        window.localStorage.getItem("fontColor")
    );

    const [fontSize, setFontSize] = useState(
        window.localStorage.getItem("fontSize")
    );

    const [items, setItems] = useState(() => {
        const value = window.localStorage.getItem("itemsList");
        return value !== null
            ? JSON.parse(value)
            : [
                "Ali",
                "Beatriz",
                "Charles",
                "Diya",
                "Eric",
                "Fatima",
                "Gabriel",
                "Hanna",
            ];
    });

    const [url, setUrl] = useState(() => {
        const value = window.localStorage.getItem("urlYoutube");
        return value !== null ? `${value}` : null;
    });

    const [controls, setControls] = useState(true);
    const [loop, setLoop] = useState(true);
    //This function updates the state variable url with the provided URL.
    function load(url) {
        setUrl(url);
    }


    //This function toggles the loop state variable between true and false.
    function handleToggleLoop() {
        setLoop(!loop);
    }


    //This function sets the player state variable.
    function ref(player) {
        setPlayer(player);
    }

    //This function changes the wheelColor and fontColor state variables based on the color parameter.
    function changeWheelAndFontColor(color) {
        setWheelColor(color.wheelColor);
        setFontColor(color.fontColor);
        setFontSize(color.fontSize);
    }


    //This function closes the modal by setting openModal to false.
    function cancelModal() {
        setOpenModal(false);
        if (winner != null) {
            setWinner(null);
        }
    }

    //-----------------------------
    //for the extra tab
    // Function to handle changes in input fields
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    let value = e.target.value;
    let formattedText = value.replace(/\n/g, "<br>");
    setDescription(formattedText);
  };
  const handleEmailContentChange = (e) => {
    let value = e.target.value;
    setEmailContent(value);
  };


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    const url = URL.createObjectURL(file);
    setImageUr(url);
    e.target.value = null;

  };
  useEffect(() => {
    const fetchSubscriptionData = async () => {
        try {
            const result = await getSub();
            console.log(result)
            setEmailContent(result.subscriptions[0].emailContent);
            setEmailContentSaye(true);

        } catch (error) {
            console.error('Error fetching subscription data:', error);
        }
    };
    fetchSubscriptionData();
}, []);



    //This function adds data to the items state variable and updates the local storage accordingly.
    function addData(val) {
        localStorage.setItem("itemsList", JSON.stringify(val));
        setItems(JSON.parse(window.localStorage.getItem("itemsList")));
    }

    // use arrow function so we don't have to .bind(this) in constructor
    //This function clears the winners array.
    function clearListEventHandler() {
        setWinners([]);
    }
    // auto delete for automaticSpin
    useEffect(() => {
        if (openModal === true && automaticSpin) removeWinnerModal();
    }, [winners]);

    //save automaticSpin state on localStorage 
    useEffect(() => {
        localStorage.setItem("automaticSpin", automaticSpin)
    }, [automaticSpin]);


    //Open winner Modal
    const OpenWinnerModal = () => {
        if (items.length === 1) {
            console.log("items updated====1");
            setWinner(items[0]);
            setOpenModal(true)
        }
    }


    //call get All Users Api and set it to users
    const handlegetUsersFn = async () => {
        const result = await getUsers();
        console.log(result.users);
        setUsers(result.users);
    }

    // call handlegetUsersFn
    useEffect(() => {
        handlegetUsersFn();
    }, []);

    // delete User 
    const handleDeleteUser = (index) => {
        const updatedUsers = [...users];
        updatedUsers.splice(index, 1);
        setUsers(updatedUsers);
    };

    //Convert Live Names to Entries And delete all users
    const liveNamesToEntries = async () => {
        localStorage.setItem('itemsList', JSON.stringify(users.map(user => user.fullName)));
        setItems(users.map(user => user.fullName));
        try {
            // Iterate over each user and call submit_name
            for (const user of users) {
                const data = new FormData();
                data.append('email', user.email);
                if (emailContentSaye){
                data.append('content', emailContent);
                }
                await submit_name(data); // Wait for the API call to complete
            }
            console.log('All emails sent successfully');
        } catch (error) {
            console.error('Error sending emails:', error);
        }

      //  const deleteUsers = async () => {
      //      await deleteAllUsers();
       // }
       // deleteUsers();
       // setUsers([]);

    }
    const DeleteAllEntries = () => {
        const deleteUsers = async () => {
            await deleteAllUsers();
        }
        deleteUsers();
        setUsers([]);
    }
    // refresh users data
    const refreshUsers = () => {
        handlegetUsersFn();

    }



   function removeWinnerModal() {
        console.log(winners);
        const winner = winners[winners.length - 1];
        console.log(winner);
        const index = items.indexOf(winner);
        items.splice(index, 1);
        setItems(items);
        console.log(`Removed ${winner} from entries.`);
        localStorage.setItem("itemsList", JSON.stringify(items));
        if(!automaticSpin) {
            const winningUsernotAutomatic = users.find(user => user.fullName === winner);
            if (winningUsernotAutomatic) {
                // Extract the email from the user object
                const winnerEmailnotAutomatic = winningUsernotAutomatic.email;
                const notify_winner_api_two = async () => {
                    const data = new FormData();
                    data.append('email', winnerEmailnotAutomatic);
                    data.append('content', '  .سيقوم الادمين بالتواصل معكم لاستلام الجائزة. Wheelsbet تهانينا مبروك! لقد فزتم معنا بالجائزة في .');
                    await notify_winner(data);
                }
                notify_winner_api_two();
        } 
        }
        if (automaticSpin) {
            setTimeout(() => {
                setOpenModal(false);
                whileref.current.click();
                OpenWinnerModal();
            }, 4000);
            const winningUser = users.find(user => user.fullName === winner);
            if (winningUser) {
                // Extract the email from the user object
                const winnerEmail = winningUser.email;
                const notify_looser_api = async () => {
                    const data = new FormData();
                    data.append('email', winnerEmail);
                    data.append('content', 'للاسف لقد خسرتم معنا في المسابقة,لكن لا تقلق مازلت المسابقات و مازلنا ننتظر اشتراكك معنا شكرا لك');
                    await notify_looser(data);
                }
                notify_looser_api();
        } 
        if (items.length === 1) {
            const lastwinnerName = users.find(user => user.fullName === items[0]);
            if (lastwinnerName ) {
                const lastwinnerEmail = lastwinnerName.email;
                const notify_winner_api = async () => {
                    const data = new FormData();
                    data.append('email', lastwinnerEmail);
                    data.append('content', ' سيتصل الادمين معكم في اقرب وقت لاستلام الجائزة.Wheelbet مبرووووك, تهانينا لقد فزتم معنا بالجائزة في ');
                    await notify_winner(data);
                }
                notify_winner_api();
            }

        }

    }

        else {
            setOpenModal(false);
        }

    }



    //This function handles the selection of winners.
    // It updates the winners array, disables certain buttons during the spinning process, and opens the modal after a certain duration.
    function selectResultEventHandler(data) {
        if (items.length > 0 && spinning !== true) {
            var selectedIndex = data;

            // set this state to disable tab and wheel click when spinning
            setSpinning(true);

            // when spinning disable update player
            document.getElementById("inputTextArea").disabled = true;
            document.getElementById("updateButton").disabled = true;
            // document.getElementById("inputSearchBar").disabled = true;
            document.getElementById("shuffleButton").disabled = true;
            document.getElementById("removeButton").disabled = true;
            document.getElementById("clearListButton").disabled = true;

            // after done spinning enable update player
            setTimeout(() => {
                setSpinning(false);
                document.getElementById("inputTextArea").disabled = false;
                document.getElementById("updateButton").disabled = false;
                // document.getElementById("inputSearchBar").disabled = false;
                document.getElementById("shuffleButton").disabled = false;
                document.getElementById("removeButton").disabled = false;
                document.getElementById("clearListButton").disabled = false;
            }, window.localStorage.getItem("duration") * 1000);

            setTimeout(() => {
                setWinners(winners.concat(items[selectedIndex]));

                //  removeWinnerModal();
            }, window.localStorage.getItem("duration") * 1000);
       

            setTimeout(async () => {
                //  if (items.length === 2) {
                //     const looser = items[selectedIndex]
                //       const winnerr = items[0] == looser ? items[1] : items[0];
                //      console.log(`looser :: ${looser} , winner :: ${winnerr} , items:: ${items}`);
                //       setWinner(winnerr);

                //    }
                setOpenModal(true);



            }, window.localStorage.getItem("duration") * 1000);



        }
    }

    let newWinnerIndex = winners.length - 1;

  
    const handleSubmit = async (e) => {
        e.preventDefault();

       try {
            // Step 1: Delete existing subscription data
            await deleteSub();
            // Step 2: Add new subscription
            const formData = new FormData();
            formData.append('title', title);
            formData.append('description', description);
            formData.append('file', image); // Append the file object here
            formData.append('price_t', paid);
            formData.append('price',price);
            formData.append('emailContent', emailContent)

            await addSub(formData);
            // Step 3: Clear input fields
            setTitle('');
            setDescription('');
            setImage('');
            setEmailContent('');
            // Optionally, you can perform any additional actions after successful submission
            // For example, show a success message or update the UI
            window.alert('Success')
            window.location.reload();
         } catch (error) {
            // Handle errors
           window.alert('Error, refresh and try again')
           console.error('Error submitting form:', error);
      }
    };

    return (
        <div className='main-content'>
        <NavigationBar onChange={changeWheelAndFontColor} automaticSpin={automaticSpin} setAutomaticSpin={setAutomaticSpin} />
          {/* <Modal show={openModal} onHide={cancelModal} size="lg">
                <Modal.Header closeButton>
                    {winner || !automaticSpin ? (<Modal.Title>Winner 🎉</Modal.Title>) : (<Modal.Title>Looser </Modal.Title>)}

                </Modal.Header>
                <Modal.Body >
                    {winner ? (<p className='mounir'>{winner}</p>) : (<p>{winners[newWinnerIndex]}</p>)}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={cancelModal}>
                        Cancel
                    </Button>
                    {!automaticSpin && (<Button variant="primary" onClick={removeWinnerModal}>
                        Remove
                    </Button>)}

                </Modal.Footer>
            </Modal> */}


            <ModalWin
                openModal={openModal}
                cancelModal={cancelModal}
                winner={winner}
                automaticSpin={automaticSpin}
                newWinnerIndex={newWinnerIndex}
                removeWinnerModal={removeWinnerModal}
                winners={winners}
               />

           <Container fluid>
                <Row>
                    <Col className="mt-4" lg={ close ? '12' : '8'} md="auto">
                        <Button variant="primary" onClick={() => setClose(!close)}>كامل الصفحة</Button>
                        <Wheel
                            items={items}
                            onChange={selectResultEventHandler}
                            spinning={spinning}
                            wheelColor={wheelColor}
                            fontColor={fontColor}
                            fontSize={fontSize}
                            automaticSpin={automaticSpin}
                            reference={whileref}
                            location={location}
                        />
                    </Col>

                     
                    <Col lg='4' style={{ display: close ? 'none' : 'block' , borderLeft:'solid 1px black'}} md="auto">
                        <div id="Tabs" className="mt-4">
                            <Tabs defaultActiveKey="entries" className="mb-3">
                                <Tab eventKey="entries" title="Entries">
                                    <ItemForm
                                        items={items}
                                        winners={winners}
                                        onClick={(value) => addData(value)}
                                        // read more: https://reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html
                                        key={items}
                                    />
                                </Tab>

                                <Tab eventKey="results" title="Results">
                                    <Result onChange={clearListEventHandler} winners={winners} />
                                </Tab>
                                <Tab eventKey="Live-names" title="Live names" style={{
                                    maxHeight: '500px',
                                    overflowY: 'auto',
                                    border: '1px solid #ccc'
                                }}>

                                <Button style={{ margin: '20px' }} onClick={liveNamesToEntries}>Save</Button>
                                <Button variant="secondary" style={{ margin: '20px' }} onClick={refreshUsers}>RefreshList</Button>
                                <Button variant="secondary" onClick={DeleteAllEntries}>Delete All entries</Button>
                                 <Table striped bordered hover variant="dark" >
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>FullName</th>
                                                <th>Email</th>
                                                <th>Delete</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {users.map((user, index) => (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{user.fullName}</td>
                                                    <td>{user.email}</td>
                                                    <td><Button onClick={() => handleDeleteUser(index)}><i class="bi bi-trash"></i></Button></td>
                                                </tr>
                                            ))}

                                        </tbody>
                                    </Table>

                                </Tab>

                                <Tab eventKey="extra" title="Extra" style={{
                                    maxHeight: '500px',
                                    overflowY: 'auto',
                                    border: '1px solid #ccc',
                                    padding:'10px'
                                }}>
                                    <form onSubmit={handleSubmit} >
                                    <h2 style={{ color: 'red', textAlign:'center'}}>أدخل العنوان</h2>
                                    <input type="text" value={title} onChange={handleTitleChange} placeholder="Title" style={{ width: '100%', padding: '10px', marginBottom: '10px', border: '1px solid #ccc', borderRadius: '5px' }} />
                                    <h2 style={{ color: 'red', textAlign:'center' }}>ادخل الوصف</h2>
                                    <textarea value={description} onChange={handleDescriptionChange} placeholder="Description" style={{ width: '100%', height: '200px', padding: '10px', marginBottom: '10px', border: '1px solid #ccc', borderRadius: '5px' }} />
                                     <input type="file" onChange={handleImageChange} placeholder="Image" style={{ marginBottom: '10px', color: "rgba(0, 0, 0, 0)"}} />
                                     {imageUr && <img src={imageUr} alt="Selected Image" style={{ maxWidth: '100px', maxHeight: '100px' }} />}
                                      <h2 style={{ color: 'red', textAlign:'center'}}>أكتب محتوى الايميل الذي سيصل للمسجل حين قبوله</h2>
                                      <h5 style={{ color: 'red', textAlign:'center'}}>يمكنك مثلا ارفاق رابط الايف و توقيته</h5>
                                     <textarea value={emailContent} onChange={handleEmailContentChange} placeholder="EmailContent" style={{ width: '100%', height: '200px', padding: '10px', marginBottom: '10px', border: '1px solid #ccc', borderRadius: '5px' }} />
                                     <div style={{ marginBottom: '10px' }}>
                                        <select onChange={(e) => { setPaid(e.target.value === 'paid') }}>
                                           <option value="free">Free</option>
                                           <option value="paid">Paid</option>
                                           </select>
                                     </div>

                                     {paid && (
                                            <div style={{ marginBottom: '10px' }}>
                                         <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Price" style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }} />
                                             </div>
                                               )}


                                     <div>
                                       <button type='submit' style={{ padding: '10px 20px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>ارسال</button>
                                     </div>
                                </form>
                                </Tab>

                            </Tabs>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Home;
