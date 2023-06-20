using System.Collections;
using System.Collections.Generic;
using System.Runtime.InteropServices;
using UnityEngine;
using UnityEngine.SceneManagement;

public class Finish : MonoBehaviour
{   
    [DllImport("__Internal")]
    private static extern void onLevelChange();

    private bool levelComplete = false;
    private void OnTriggerEnter2D(Collider2D collision)
    {
        if (collision.gameObject.name == "Player 1" && !levelComplete)
        {
            levelComplete = true;
            Invoke("CompleteLevel", 1f);
        
        }
    }

    private void CompleteLevel()
    {
        SceneManager.LoadScene(SceneManager.GetActiveScene().buildIndex + 1);
        onLevelChange();
    }

}
