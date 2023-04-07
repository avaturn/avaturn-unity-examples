using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.Events;

public class MobileOrientation : MonoBehaviour
{
    [SerializeField] private ScreenOrientation _horizontalOrient, _verticalOrient;
    [SerializeField] private UnityEvent _startEvent;

    private void Start()
    {
        _startEvent?.Invoke();
    }

    public void ChangeOrientation(ScreenOrientation orientation)
    {
        Screen.orientation = orientation;
    }

    public void HorizontalOrientation()
    {
        ChangeOrientation(_horizontalOrient);
    }

    public void PortraitOrientation()
    {
        ChangeOrientation(_verticalOrient);
    }
}
