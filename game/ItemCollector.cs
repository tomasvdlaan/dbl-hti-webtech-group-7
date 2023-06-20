using System.Collections;
using System.Collections.Generic;
using System.Runtime.InteropServices;
using UnityEngine;
using UnityEngine.UI;

public class ItemCollector : MonoBehaviour
{
  [DllImport("__Internal")]
  private static extern void onScoreChange();

  private int collectable = 0;

  [SerializeField] private Text counterText;

  private void OnTriggerEnter2D(Collider2D collision)
  {
    if (collision.gameObject.CompareTag("Collectable"))
    {
      Destroy(collision.gameObject);
      collectable++;
      onScoreChange();
      counterText.text = "Bananas: " + collectable;
    }
  }
}
